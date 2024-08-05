import validator from "validator";
import { z } from "zod";

export const userSchema = z.object({
  userId: z.string(),
  id: z.string(),
  phone: z.string().optional().nullable(),
  verified: z.string().optional().nullable(),
  latestProfileId: z.string().optional().nullable(),
});
export const profileSchema = z.object({});

export type PersistedAccount = z.infer<typeof userSchema>;
export type PersistedProfile = z.infer<typeof profileSchema>;

export const schema = z.object({
  session: z.object({
    user: z.optional(userSchema).nullable(),
    profile: z.optional(profileSchema).nullable(),
    token: z.string().optional().nullable(),
  }),
});

export type Schema = z.infer<typeof schema>;
