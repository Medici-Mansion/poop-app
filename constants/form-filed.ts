import { SignInFields, SignupFormField } from "@/types";
import { KeyboardTypeOptions } from "react-native";

export const SigninFormField: SignInFields[] = [
  {
    id: 1,
    name: "id",
  },
  {
    id: 2,
    name: "password",
  },
];

export const SignupFormList: (SignupFormField & {
  keyboard?: KeyboardTypeOptions;
  secure?: boolean;
})[] = [
  {
    id: 1,
    placeholder: "닉네임",
    name: "id" as const,
    title: "닉네임을 입력해주세요",
  },
  {
    id: 2,
    placeholder: "비밀번호",
    name: "password" as const,
    title: "비밀번호를 입력해주세요",
    secure: true,
  },
  {
    id: 3,
    placeholder: "비밀번호 확인",
    name: "passwordConfirm" as const,
    title: "비밀번호를 한 번 더 입력해주세요",
  },
  {
    id: 4,
    placeholder: "생년월일",
    name: "birthday" as const,
    title: "생년월일을 입력해주세요",
  },
  {
    id: 5,
    placeholder: "휴대폰 번호",
    name: "phone" as const,
    title: "휴대폰 번호를 입력해주세요",
  },
  {
    id: 6,
    placeholder: "인증 번호",
    name: "code" as const,
    title: "인증 번호를 입력해주세요",
  },
];
