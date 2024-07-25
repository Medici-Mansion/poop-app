export const PhoneNumberValidation = {
  rules: {
    required: "휴대폰 번호를 입력해주세요.",
    pattern: {
      value: /^(010)(\d{3,4})(\d{4})$/,
    },
  },
  parse: (phoneNumber: string) =>
    (phoneNumber + "")
      .replace(/[^0-9]/g, "")
      .match(PhoneNumberValidation.rules.pattern.value),
};
