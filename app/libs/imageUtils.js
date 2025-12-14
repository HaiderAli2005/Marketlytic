// Utility function to convert Buffer data to URL string
export const toUrlString = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img.trim();
  if (img?.type === "Buffer" && Array.isArray(img?.data)) {
    try {
      const u8 = new Uint8Array(img.data);
      return new TextDecoder("utf-8").decode(u8).trim();
    } catch {
      return null;
    }
  }
  return null;
};
