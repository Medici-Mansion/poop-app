// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Platform } from "react-native";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ForwardedRef } from "react";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export const getFormData = (data: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};

export function getDataUriSize(uri: string): number {
  return Math.round((uri.length * 3) / 4);
}

export interface ContentImage {
  filename: string | null;
  filepath: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
}

// export async function getImageData(
//   content: ContentImage,
// ): Promise<ContentImage> {
//   switch (Platform.OS) {
//     case 'ios':
//       const iosFile = await CameraRoll.iosGetImageDataById(content.uri);
//       return { ...iosFile.node.image, uri: iosFile.node.image.filepath! };
//     case 'android':
//       const androidFile = await RNFS.stat(content.uri);
//       return { ...content, uri: `file://${androidFile.originalFilepath}` };
//     default:
//       throw new Error('Not Support.');
//   }
// }

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // 시간, 분, 초 문자열 생성, 분이 0이어도 "00"으로 표시
  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  const formattedMinutes = String(minutes).padStart(2, "0") + ":";
  const formattedSeconds = String(Math.round(remainingSeconds)).padStart(
    2,
    "0"
  );

  const formattedTimeString =
    formattedHours + formattedMinutes + formattedSeconds;

  return formattedTimeString.includes("NaN") ? "" : formattedTimeString;
};

export function isEmpty(value: unknown): boolean {
  // Null or Undefined
  if (value == null) return true;

  // Boolean
  if (typeof value === "boolean") return !value;

  // Number
  if (typeof value === "number") return isNaN(value);

  // String
  if (typeof value === "string") return value.trim().length === 0;

  // Array
  if (Array.isArray(value)) return value.length === 0;

  // Object
  if (typeof value === "object") {
    // Check if it's an instance of a date and if it's invalid
    if (value instanceof Date) return isNaN(value.getTime());

    // Check if it's an empty object

    return Object.keys(value).length === 0;
  }

  // Set and Map
  if (value instanceof Set || value instanceof Map) return value.size === 0;

  // If none of the above conditions are met, return false
  return false;
}
