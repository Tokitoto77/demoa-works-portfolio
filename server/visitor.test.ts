import { describe, it, expect, beforeEach, vi } from "vitest";
import { upsertVisitorProfile, getVisitorProfileByVisitorId, getAllVisitorProfiles } from "./db";
import type { InsertVisitorProfile } from "../drizzle/schema";

/**
 * Visitor Profile Database Tests
 * Tests for visitor profile CRUD operations
 */

describe("Visitor Profile Database Operations", () => {
  const mockVisitorProfile: InsertVisitorProfile = {
    visitorId: "visitor-test-001",
    name: "テスト太郎",
    email: "test@example.com",
    phone: "09012345678",
    company: "テスト会社",
    jobTitle: "営業部長",
    interestType: "LP制作",
    message: "LP制作に興味があります",
    consentToContact: 1,
  };

  describe("upsertVisitorProfile", () => {
    it("should successfully insert a new visitor profile", async () => {
      const profile: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId: "visitor-insert-test-" + Date.now(),
      };

      // Should not throw
      await expect(upsertVisitorProfile(profile)).resolves.toBeUndefined();
    });

    it("should throw error when visitorId is missing", async () => {
      const invalidProfile: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId: "",
      };

      await expect(upsertVisitorProfile(invalidProfile)).rejects.toThrow(
        "Visitor visitorId is required for upsert"
      );
    });

    it("should update existing profile when visitorId already exists", async () => {
      const visitorId = "visitor-update-test-" + Date.now();
      const profile1: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId,
        name: "初回名前",
      };

      const profile2: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId,
        name: "更新後の名前",
      };

      // Insert first profile
      await upsertVisitorProfile(profile1);

      // Update with second profile
      await expect(upsertVisitorProfile(profile2)).resolves.toBeUndefined();

      // Verify the profile was updated
      const retrieved = await getVisitorProfileByVisitorId(visitorId);
      expect(retrieved?.name).toBe("更新後の名前");
    });
  });

  describe("getVisitorProfileByVisitorId", () => {
    it("should retrieve a visitor profile by visitorId", async () => {
      const visitorId = "visitor-get-test-" + Date.now();
      const profile: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId,
      };

      await upsertVisitorProfile(profile);
      const retrieved = await getVisitorProfileByVisitorId(visitorId);

      expect(retrieved).toBeDefined();
      expect(retrieved?.visitorId).toBe(visitorId);
      expect(retrieved?.email).toBe(profile.email);
      expect(retrieved?.company).toBe(profile.company);
    });

    it("should return undefined for non-existent visitorId", async () => {
      const result = await getVisitorProfileByVisitorId("non-existent-visitor-id");
      expect(result).toBeUndefined();
    });
  });

  describe("getAllVisitorProfiles", () => {
    it("should retrieve all visitor profiles", async () => {
      const visitorId1 = "visitor-all-test-1-" + Date.now();
      const visitorId2 = "visitor-all-test-2-" + Date.now();

      const profile1: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId: visitorId1,
        name: "プロフィール1",
      };

      const profile2: InsertVisitorProfile = {
        ...mockVisitorProfile,
        visitorId: visitorId2,
        name: "プロフィール2",
      };

      await upsertVisitorProfile(profile1);
      await upsertVisitorProfile(profile2);

      const allProfiles = await getAllVisitorProfiles();

      expect(Array.isArray(allProfiles)).toBe(true);
      expect(allProfiles.length).toBeGreaterThanOrEqual(2);

      const retrievedIds = allProfiles.map((p) => p.visitorId);
      expect(retrievedIds).toContain(visitorId1);
      expect(retrievedIds).toContain(visitorId2);
    });

    it("should return empty array when no profiles exist", async () => {
      // This test assumes database is empty or will return at least an empty array
      const allProfiles = await getAllVisitorProfiles();
      expect(Array.isArray(allProfiles)).toBe(true);
    });
  });

  describe("Visitor Profile Data Integrity", () => {
    it("should preserve all optional fields", async () => {
      const visitorId = "visitor-integrity-test-" + Date.now();
      const profile: InsertVisitorProfile = {
        visitorId,
        name: "完全なプロフィール",
        email: "complete@example.com",
        phone: "09098765432",
        company: "完全な会社",
        jobTitle: "マネージャー",
        interestType: "自動化",
        message: "詳細なメッセージ内容",
        consentToContact: 1,
      };

      await upsertVisitorProfile(profile);
      const retrieved = await getVisitorProfileByVisitorId(visitorId);

      expect(retrieved?.name).toBe(profile.name);
      expect(retrieved?.email).toBe(profile.email);
      expect(retrieved?.phone).toBe(profile.phone);
      expect(retrieved?.company).toBe(profile.company);
      expect(retrieved?.jobTitle).toBe(profile.jobTitle);
      expect(retrieved?.interestType).toBe(profile.interestType);
      expect(retrieved?.message).toBe(profile.message);
      expect(retrieved?.consentToContact).toBe(profile.consentToContact);
    });

    it("should handle minimal profile data", async () => {
      const visitorId = "visitor-minimal-test-" + Date.now();
      const minimalProfile: InsertVisitorProfile = {
        visitorId,
        email: "minimal@example.com",
        consentToContact: 0,
      };

      await upsertVisitorProfile(minimalProfile);
      const retrieved = await getVisitorProfileByVisitorId(visitorId);

      expect(retrieved?.visitorId).toBe(visitorId);
      expect(retrieved?.email).toBe(minimalProfile.email);
      expect(retrieved?.consentToContact).toBe(0);
      // Optional fields should be null or undefined
      expect(retrieved?.name).toBeFalsy();
    });
  });
});
