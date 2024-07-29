const theme = {
  fontFamily: {
    pretendard: "Pretendard-Regular",
  },
  fontSize: {
    // HEAD
    "head1-sb48": 48,
    "head-sb24": 24,
    "head-sb21": 21,
    "head-sb16": 16,
    "head5-sb16": 16,
    "head-sb14": 14,
    "head-sb12": 12,
    // // BODY
    "body-b16": 16,
    "body-b12": [
      12,
      {
        fontWeight: 700,
      },
    ],
    "body-b14": [
      14,
      {
        fontWeight: 700,
      },
    ],
    "body-m14": [
      14,
      {
        fontWeight: 500,
      },
    ],
    "body-m12": [
      12,
      {
        fontWeight: 500,
      },
    ],
  },
  colors: {
    gray: {
      600: "#121212",
      500: "#1C1C1C",
      400: "#353434",
      300: "#595959",
      200: "#959595",
      100: "#D5D5D5",
    },
    system: {
      red: "#FF4C4C",
      orange: "#FF743E",
      yellow: "#FFED4E",
      green: "#00C27C",
      blue: "#397DFF",
      indigo: "#142759",
      purple: "#8940FF",
    },
    transparent: {
      80: "rgba(18,18,18,0.8)",
      60: "rgba(0,0,0,0.6)",
      0: "rgba(0,0,0,0)",
    },
    black: "#000000",
  },
};

module.exports = { theme };
