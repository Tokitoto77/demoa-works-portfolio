import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, visitorProfiles, InsertVisitorProfile } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create or update a visitor profile
 */
export async function upsertVisitorProfile(profile: InsertVisitorProfile): Promise<void> {
  if (!profile.visitorId) {
    throw new Error("Visitor visitorId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert visitor profile: database not available");
    return;
  }

  try {
    await db.insert(visitorProfiles).values(profile).onDuplicateKeyUpdate({
      set: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        company: profile.company,
        jobTitle: profile.jobTitle,
        interestType: profile.interestType,
        message: profile.message,
        consentToContact: profile.consentToContact,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to upsert visitor profile:", error);
    throw error;
  }
}

/**
 * Get a visitor profile by visitorId
 */
export async function getVisitorProfileByVisitorId(visitorId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get visitor profile: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(visitorProfiles)
    .where(eq(visitorProfiles.visitorId, visitorId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get all visitor profiles
 */
export async function getAllVisitorProfiles() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get visitor profiles: database not available");
    return [];
  }

  return await db.select().from(visitorProfiles).orderBy(visitorProfiles.createdAt);
}

// TODO: add feature queries here as your schema grows.
