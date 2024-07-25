import z from "zod";
import validate from "validator";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/constants/validate";

export const signinFormSchema = z.object({
  id: z
    .string()
    .min(6, { message: "6글자 이상 작성해주세요!" })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: "6자 이상 작성해주세요" }),
  // .regex(PASSWORD_REGEX, { message: "ㅎㅇㅎㅇㅎㅇㅎㅇ" }),
});

export const getSignupFormSchemaForStep = (step: number, value: any) => {
  const { phone, email } = value || {};

  const phoneEmailSchema = z.object({
    phone: z
      .string()
      .toLowerCase()
      .refine(
        (data) =>
          phone !== ""
            ? validate.isMobilePhone(phone)
            : validate.isEmail(email),
        { message: "휴대폰 번호 또는 이메일 형식으로 입력해주세요." }
      )
      .optional(),
  });
  const schemas = [
    z.object({
      nickname: z.string().min(6, { message: "6글자 이상 작성해주세요!" }),
    }),
    z.object({
      id: z.string().min(6, { message: "6글자 이상 작성해주세요!" }).trim(),
    }),
    z.object({
      password: z
        .string()
        .toLowerCase()
        .min(PASSWORD_MIN_LENGTH, { message: "6자 이상 작성해주세요!" }),
    }),
    z.object({
      birthday: z.string(),
    }),
    z.object({
      gender: z.string(),
    }),
    z.object({
      code: z.string().optional(),
    }),
    phoneEmailSchema,
  ];

  return schemas[step];
};
