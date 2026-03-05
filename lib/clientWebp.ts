const MAX_DIMENSION = 1920;

type ConvertToWebpOptions = {
  quality?: number;
  maxDimension?: number;
};

export async function convertImageFileToWebp(
  file: File,
  options: ConvertToWebpOptions = {}
): Promise<File> {
  const quality = options.quality ?? 0.82;
  const maxDimension = options.maxDimension ?? MAX_DIMENSION;

  const imageBitmap = await createImageBitmap(file);
  const ratio = Math.min(1, maxDimension / Math.max(imageBitmap.width, imageBitmap.height));
  const width = Math.max(1, Math.round(imageBitmap.width * ratio));
  const height = Math.max(1, Math.round(imageBitmap.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Failed to create canvas context.");
  }

  context.drawImage(imageBitmap, 0, 0, width, height);
  imageBitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((result) => resolve(result), "image/webp", quality)
  );

  if (!blob) {
    throw new Error("Failed to convert image to WebP.");
  }

  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
