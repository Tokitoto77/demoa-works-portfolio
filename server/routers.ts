import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { upsertVisitorProfile, getVisitorProfileByVisitorId, getAllVisitorProfiles } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  visitor: router({
    /**
     * Save or update visitor profile
     * Public endpoint - anyone can submit their profile
     */
    saveProfile: publicProcedure
      .input(
        z.object({
          visitorId: z.string().min(1, "Visitor ID is required"),
          name: z.string().optional(),
          email: z.string().email("Invalid email"),
          phone: z.string().optional(),
          company: z.string().optional(),
          jobTitle: z.string().optional(),
          interestType: z.string().optional(),
          message: z.string().optional(),
          consentToContact: z.number().int().min(0).max(1).default(0),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await upsertVisitorProfile(input);
          return { success: true };
        } catch (error) {
          console.error("Failed to save visitor profile:", error);
          throw new Error("Failed to save visitor profile");
        }
      }),

    /**
     * Get visitor profile by visitorId
     * Public endpoint - anyone can retrieve their profile
     */
    getProfile: publicProcedure
      .input(z.object({ visitorId: z.string().min(1) }))
      .query(async ({ input }) => {
        try {
          const profile = await getVisitorProfileByVisitorId(input.visitorId);
          return profile || null;
        } catch (error) {
          console.error("Failed to get visitor profile:", error);
          throw new Error("Failed to get visitor profile");
        }
      }),

    /**
     * Get all visitor profiles
     * Protected endpoint - only admin can access
     */
    getAllProfiles: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Unauthorized: Only admins can view all profiles");
      }
      try {
        return await getAllVisitorProfiles();
      } catch (error) {
        console.error("Failed to get all visitor profiles:", error);
        throw new Error("Failed to get all visitor profiles");
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
