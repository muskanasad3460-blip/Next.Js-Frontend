const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Safe image URL builder
 */
export function getImageUrl(path?: string | null): string {
  if (!path) return "/n1.jpg";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
}

/**
 * Product main image
 */
export function getMainImage(product: any): string {
  if (product?.images?.length > 0) {
    return getImageUrl(product.images[0].url);
  }

  return getImageUrl(product?.image);
}

/**
 * Product gallery images
 */
export function getProductImages(product: any): string[] {
  if (product?.images?.length > 0) {
    return product.images.map((img: any) => getImageUrl(img.url));
  }

  if (product?.image) {
    return [getImageUrl(product.image)];
  }

  return ["/n1.jpg"];
}

/**
 * API URL builder (NEW)
 */
export function apiUrl(path: string) {
  return `${BASE_URL}${path}`;
}
