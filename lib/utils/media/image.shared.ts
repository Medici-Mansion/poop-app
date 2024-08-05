import { PickedImage } from "@/types";
import uuid from "react-native-uuid";
import { cacheDirectory, copyAsync, deleteAsync } from "expo-file-system";
import { isAndroid } from "@/constants/platform/detection";
import ImageResizer from "@bam.tech/react-native-image-resizer";

export async function compressIfNeeded(
  img: PickedImage,
  maxSize: number = 10000
): Promise<PickedImage> {
  const origUri = `file://${img.path}`;
  if (img.size < maxSize) {
    return img;
  }
  const resizedImage = await doResize(origUri, {
    width: img.width,
    height: img.height,
    mode: "stretch",
    maxSize,
  });
  const finalImageMovedPath = await moveToPermanentPath(
    resizedImage.path,
    ".jpg"
  );
  const finalImg = {
    ...resizedImage,
    path: finalImageMovedPath,
  };
  return finalImg;
}

// internal methods
// =

function normalizePath(str: string, allPlatforms = false): string {
  if (isAndroid || allPlatforms) {
    if (!str.startsWith("file://")) {
      return `file://${str}`;
    }
  }
  return str;
}

interface DoResizeOpts {
  width: number;
  height: number;
  mode: "contain" | "cover" | "stretch";
  maxSize: number;
}

export async function safeDeleteAsync(path: string) {
  // Normalize is necessary for Android, otherwise it doesn't delete.
  const normalizedPath = normalizePath(path);
  try {
    await Promise.allSettled([
      deleteAsync(normalizedPath, { idempotent: true }),
      // HACK: Try this one too. Might exist due to api-polyfill hack.
      deleteAsync(normalizedPath.replace(/\.jpe?g$/, ".bin"), {
        idempotent: true,
      }),
    ]);
  } catch (e) {
    console.error("Failed to delete file", e);
  }
}

async function doResize(
  localUri: string,
  opts: DoResizeOpts
): Promise<PickedImage> {
  for (let i = 0; i < 9; i++) {
    const quality = 100 - i * 10;
    const resizeRes = await ImageResizer.createResizedImage(
      localUri,
      opts.width,
      opts.height,
      "JPEG",
      quality,
      undefined,
      undefined,
      undefined,
      { mode: opts.mode }
    );
    if (resizeRes.size < opts.maxSize) {
      return {
        path: normalizePath(resizeRes.path),
        mime: "image/jpeg",
        size: resizeRes.size,
        width: resizeRes.width,
        height: resizeRes.height,
      };
    } else {
      safeDeleteAsync(resizeRes.path);
    }
  }
  throw new Error(
    `This image is too big! We couldn't compress it down to ${opts.maxSize} bytes`
  );
}
function joinPath(a: string, b: string) {
  if (a.endsWith("/")) {
    if (b.startsWith("/")) {
      return a.slice(0, -1) + b;
    }
    return a + b;
  } else if (b.startsWith("/")) {
    return a + b;
  }
  return a + "/" + b;
}
async function moveToPermanentPath(path: string, ext = "jpg"): Promise<string> {
  /*
  Since this package stores images in a temp directory, we need to move the file to a permanent location.
  Relevant: IOS bug when trying to open a second time:
  https://github.com/ivpusic/react-native-image-crop-picker/issues/1199
  */
  const filename = uuid.v4();

  // cacheDirectory will not ever be null on native, but it could be on web. This function only ever gets called on
  // native so we assert as a string.
  const destinationPath = joinPath(cacheDirectory as string, filename + ext);
  await copyAsync({
    from: normalizePath(path),
    to: normalizePath(destinationPath),
  });
  safeDeleteAsync(path);
  return normalizePath(destinationPath);
}
