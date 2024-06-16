import z from "zod";

import { PASSWORD_MIN_LENGT, PASSWORD_REGEX } from "@/constants/schema";

export const loginFormSchema = z.object({
  id: z.string().min(6).toLowerCase().trim(),
  password: z.string().min(PASSWORD_MIN_LENGT).regex(PASSWORD_REGEX),
});
