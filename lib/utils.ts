import { colors } from "@/constants/colors";
import { Address } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { Decimal } from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const uppercaseFirstChars = (data: string): string => {
  return data
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const replaceUnderscoresWithSpaces = (data: string): string => {
  return data.split("_").join(" ");
};

export const generateUrlPaths = (data: string): string => {
  return data.split(" ").join("_");
};

export const decimalToString = (decimal: Decimal) => {
  return new Decimal(decimal).toFixed(2);
};

export const toDecimal = (value: string | number) => {
  return new Decimal(value);
};

export const decimalToNumber = (decimal: Decimal): number => {
  return Number(decimal);
};

export function generateInitials(name: string) {
  const nameParts = name.split(" ");
  let initials = "";
  for (const name of nameParts) {
    initials += name.slice(0, 1);
  }
  return initials.length > 2 ? initials.slice(0, 2) : initials;
}

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function extractCloudinaryPublicId(url: string): string {
  const baseUrlPattern =
    /https?:\/\/res.cloudinary.com\/[^\/]+\/image\/upload\/(?:v\d+\/)?/;
  let publicIdWithExtension = url.replace(baseUrlPattern, "");

  const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    publicIdWithExtension = publicIdWithExtension.substring(0, lastDotIndex);
  }

  return publicIdWithExtension;
}

export const formatAddress = (address: Address): string => {
  return `${address.streetName} ${address.buildingNumber}, ${
    address.addressLine2 ? address.addressLine2 + ", " : ""
  }${address.city}, ${address.postalCode}, ${address.country}`;
};
