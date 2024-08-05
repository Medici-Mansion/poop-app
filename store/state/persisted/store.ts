import AsyncStorage from "@react-native-async-storage/async-storage";

import { logger } from "@/lib/logger";
import { Schema, schema } from "@/store/state/persisted/schema";

const POOP_STORAGE = "POOP_STORAGE";

export async function write(value: Schema) {
  schema.parse(value);
  await AsyncStorage.setItem(POOP_STORAGE, JSON.stringify(value));
}

export async function read(): Promise<Schema | undefined> {
  const rawData = await AsyncStorage.getItem(POOP_STORAGE);
  const objData = rawData ? JSON.parse(rawData) : undefined;

  // new user
  if (!objData) return undefined;

  // existing user, validate
  const parsed = schema.safeParse(objData);

  if (parsed.success) {
    return objData;
  } else {
    const errors =
      parsed.error?.errors?.map((e) => ({
        code: e.code,
        // @ts-ignore exists on some types
        expected: e?.expected,
        path: e.path?.join("."),
      })) || [];
    logger.error(`persisted store: data failed validation on read`, { errors });
    return undefined;
  }
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(POOP_STORAGE);
  } catch (e: any) {
    logger.error(`persisted store: failed to clear`, { message: e.toString() });
  }
}
