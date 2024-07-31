import { z } from "zod";

export const userSchema = z.object({});
export const profileSchema = z.object({});

export type PersistedAccount = z.infer<typeof userSchema>;
export type PersistedProfile = z.infer<typeof profileSchema>;

export const schema = z.object({
  session: z.object({
    user: userSchema,
    profile: profileSchema,
    token: z.string().optional(),
  }),
});

export type Schema = z.infer<typeof schema>;
