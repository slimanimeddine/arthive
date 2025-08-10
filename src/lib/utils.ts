/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type z from "zod";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function fileUrl(url: string | null | undefined) {
  if (!url) return undefined;
  const modifiedUrl = url.replace("public", "");
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${modifiedUrl}`;
}

export function authHeader(token: string) {
  return {
    request: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function turnBlobToFile(blob: Blob) {
  return new File([blob], "image.jpeg", {
    type: blob.type,
  });
}

export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    img.onerror = (error) => reject(error);
  });
}

export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  rotation = 0,
): Promise<Blob | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context");
  }

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    -crop.width / 2,
    -crop.height / 2,
    crop.width,
    crop.height,
  );
  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

export function getUrlFromBlob(blob: Blob | null): string {
  if (!blob) return "";
  return URL.createObjectURL(blob);
}

export type DirtyFieldsType =
  | boolean
  | null
  | {
      [key: string]: DirtyFieldsType;
    }
  | DirtyFieldsType[];

export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: Partial<Record<keyof T, DirtyFieldsType>>,
  values: T,
): Partial<T> {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    const value = dirtyFields[key];
    if (!value) {
      return prev;
    }
    const isObject = typeof value === "object";
    const isArray = Array.isArray(value);
    const nestedValue =
      isObject && !isArray
        ? getDirtyValues(value as Record<string, any>, values[key])
        : values[key];
    return { ...prev, [key]: isArray ? values[key] : nestedValue };
  }, {} as Partial<T>);
  return dirtyValues;
}

export function addOrdinalSuffix(num: number): string {
  const remainder100 = num % 100;
  const remainder10 = num % 10;

  if (remainder100 >= 11 && remainder100 <= 13) {
    return `${num}th`;
  }

  switch (remainder10) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

export function parseParams<T extends z.ZodType>(data: unknown, schema: T) {
  return schema.safeParse(data);
}
