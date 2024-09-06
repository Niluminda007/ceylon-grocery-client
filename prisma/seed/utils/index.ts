export const generateSKU = (productName: string, categoryId: string) => {
  const prefix = categoryId.substring(0, 3).toUpperCase();
  const namePart = productName.substring(0, 3).toUpperCase();
  const uniquePart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${namePart}-${uniquePart}`;
};

export const lowercaseFirstChars = (data: string): string => {
  return data
    .split(" ")
    .map((part) => part.charAt(0).toLowerCase() + part.slice(1))
    .join(" ");
};

export const generateUrlPaths = (data: string): string => {
  return data.split(" ").join("_");
};
