import * as z from "zod";

export const AddressSchema = z.object({
  streetName: z.string().min(1, { message: "Street name is required" }),
  buildingNumber: z.string().min(1, { message: "Building number is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});
