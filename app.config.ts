import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default ({ config }: ConfigContext) =>
  ({
    ...config,
    name: "poop",
    slug: "poop",
    experiments: {
      typedRoutes: true,
    },
    ios: {
      ...config.ios,
      config: {
        ...config.ios?.config,
        usesNonExemptEncryption: false,
      },
      usesAppleSignIn: true,
      bundleIdentifier: "com.medici-mansion.poop",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["com.medici-mansion.poop"],
          },
        ],
      },
    },
    plugins: [
      ...(config.plugins || []),
      [
        "expo-media-library",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
          isAccessMediaLocationEnabled: true,
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.502855032276-uhfupiqrfjn8194qcg9qrbevvf4qvo0k",
        },
      ],
      [
        "expo-secure-store",
        {
          faceIDPermission:
            "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
        },
      ],
    ],
  } satisfies ExpoConfig);
