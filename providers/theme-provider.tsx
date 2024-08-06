import { NativeWindStyleSheet } from "nativewind";
import { PropsWithChildren, useLayoutEffect } from "react";

function calcLineHeight(fontSize: number, percentage: number) {
  return fontSize * percentage;
}
/**
 * 100	Thin (Hairline)
 * 200	Extra Light (Ultra Light)
 * 300	Light
 * 400	Normal (Regular)
 * 500	Medium
 * 600	Semi Bold (Demi Bold)
 * 700	Bold
 * 800	Extra Bold (Ultra Bold)
 */
function modifyStyleSheet() {
  NativeWindStyleSheet.create({
    styles: {
      // Text Head
      "text-head-sb24": {
        fontSize: 24,
        fontFamily: "Pretendard",
        fontWeight: "800",
        lineHeight: calcLineHeight(24, 1.6),
      },
      "text-head4-sb21": {
        fontSize: 21,
        fontFamily: "Pretendard",
        fontWeight: "600",
        lineHeight: calcLineHeight(21, 1.6),
      },
      "text-head-s16": {
        fontSize: 16,
        fontFamily: "Pretendard",
        fontWeight: "800",
      },
      "text-head-sb14": {
        fontSize: 14,
        fontFamily: "Pretendard",
        fontWeight: "800",
        lineHeight: calcLineHeight(14, 1.6),
      },
      "text-head-sb12": {
        fontSize: 12,
        fontFamily: "Pretendard",
        fontWeight: "800",
        lineHeight: calcLineHeight(12, 1.6),
      },

      // Text Body
      "text-body-b16": {
        fontSize: 16,
        fontFamily: "Pretendard",
        fontWeight: "700",
      },
      "text-body1-b18": {
        fontSize: 18,
        fontFamily: "Pretendard",
        fontWeight: "700",
        lineHeight: calcLineHeight(20, 1.6),
      },
      "text-body2-b16": {
        fontSize: 16,
        fontFamily: "Pretendard",
        fontWeight: "700",
        lineHeight: 20,
      },
      "text-body-b14": {
        fontSize: 14,
        fontFamily: "Pretendard",
        fontWeight: "700",
        lineHeight: calcLineHeight(14, 1.6),
      },
      "text-body-b12": {
        fontSize: 12,
        fontFamily: "Pretendard",
        fontWeight: "700",
      },
      "text-body4-m16": {
        fontSize: 16,
        fontFamily: "Pretendard",
        fontWeight: "500",
        lineHeight: calcLineHeight(16, 1.6),
      },
      "text-body-m14": {
        fontSize: 14,
        fontFamily: "Pretendard",
        fontWeight: "500",
      },
      "text-body5-m14": {
        fontSize: 14,
        fontFamily: "Pretendard",
        fontWeight: "500",
      },
      "text-body-m12": {
        fontSize: 12,
        fontFamily: "Pretendard",
        fontWeight: "500",
      },
      "text-body-m11": {
        fontSize: 11,
        fontFamily: "Pretendard",
        fontWeight: "500",
      },

      // Colors
    },
  });
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    modifyStyleSheet();
  }, []);
  return children;
};
