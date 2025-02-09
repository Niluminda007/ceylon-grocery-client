import { colors } from "@/constants/colors";
import { Address, DeliveryOption, Order } from "@prisma/client";
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

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Generates a random alphanumeric suffix
export const generateRandomSuffix = (length = 3) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generates a custom order ID
export const generateOrderId = (orderCount: number) => {
  const sequenceNumber = orderCount + 1;

  const totalOrders = sequenceNumber.toString().length;
  const paddingLength = Math.max(3, totalOrders);

  const formattedNumber = String(sequenceNumber).padStart(paddingLength, "0");

  const randomSuffix = generateRandomSuffix();

  return `CG${formattedNumber}${randomSuffix}`;
};

// Calculate Delivery Date
export const calculateDeliveryDate = (
  orderedDate: Date,
  deliveryOption: DeliveryOption
): string => {
  console.log(orderedDate);
  if (!orderedDate || isNaN(orderedDate.getTime())) {
    return "Invalid orderedDate provided";
  }
  const isExpress = deliveryOption.method === "Express";
  let deliveryDate: Date;

  if (isExpress) {
    // Express delivery means the same day
    deliveryDate = new Date(orderedDate.getTime());
  } else {
    const day = orderedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const daysUntilNextDelivery: any = {
      0: 1, // Sunday -> Monday
      1: 3, // Monday -> Thursday
      2: 2, // Tuesday -> Thursday
      3: 4, // Wednesday -> Monday
      4: 4, // Thursday -> Monday
      5: 3, // Friday -> Monday
      6: 2, // Saturday -> Monday
    };

    // Calculate the delivery date
    deliveryDate = new Date(
      orderedDate.getTime() + daysUntilNextDelivery[day] * 24 * 60 * 60 * 1000
    );
  }

  // Return the delivery date as a formatted string
  return deliveryDate.toLocaleDateString();
};
