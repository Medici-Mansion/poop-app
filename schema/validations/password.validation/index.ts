export const PasswordValidation = {
  rules: {
    required: "비밀번호를 한 번 더 입력해주세요.",
    minLength: {
      value: 6,
      message: "띄어쓰기 없이 6~12자로 입력해주세요.",
    },
    maxLength: {
      value: 12,
      message: "띄어쓰기 없이 6~12자로 입력해주세요.",
    },
  },
  parse: (password: string) => password.replace(/s+/g, ""),
};
