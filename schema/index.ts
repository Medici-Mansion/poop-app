import z from "zod";

import { PASSWORD_MIN_LENGT, PASSWORD_REGEX } from "@/constants/validate";

export const loginFormSchema = z.object({
  id: z
    .string()
    .min(6, { message: "6글자 이상 작성해주세요!" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGT, { message: "6자 이상 작성해주세요" })
    .regex(PASSWORD_REGEX, { message: "ㅎㅇㅎㅇㅎㅇㅎㅇ" }),
});



export const createProfileSchema = z.object({
  name: z.string().min(2, { message: "2글자 이상 작성해주세요!" }),
});
