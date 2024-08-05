import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeWindStyleSheet } from "nativewind";
import { Token } from "./token";
import { injectInterceptor } from "./apis";
import * as persisted from "@/store/state/persisted";
export async function init() {
  await persisted.init();
  const accessToken = await AsyncStorage.getItem(Token.ACT);

  if (accessToken) {
    try {
      await injectInterceptor({ accessToken, shouldRefresh: true });
    } catch (error) {
      await AsyncStorage.clear();
    }
  }
}
