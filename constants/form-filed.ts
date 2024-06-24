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
    placeholder: "이름",
    name: "nickname",
    title: "이름을 입력해주세요",
  },
  {
    id: 2,
    placeholder: "아이디",
    name: "id",
    title: "아이디를 입력해주세요",
  },
  {
    id: 3,
    placeholder: "비밀번호",
    name: "password",
    title: "비밀번호를 입력해주세요",
    secure: true,
  },
  {
    id: 4,
    placeholder: "생년월일",
    name: "birthday",
    title: "생년월일을 입력해주세요",
  },
  {
    id: 5,
    placeholder: "성별",
    name: "gender",
    title: "성별을 선택해주세요",
  },
  {
    id: 6,
    placeholder: "휴대폰 번호",
    name: "phone",
    title: "휴대폰 번호 또는 이메일을\n입력해주세요",
  },
  {
    id: 7,
    placeholder: "인증 번호",
    name: "code",
    title: "인증 번호를 입력해주세요",
  },
];
