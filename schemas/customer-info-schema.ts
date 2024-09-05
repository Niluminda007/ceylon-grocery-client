import * as z from "zod";

export const CustomerInfoSchema = z.object({
  email: z.string().email({
    message: "Valid email is required",
  }),
  telephone: z.string().min(1, {
    message: "Telephone is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  apartment: z.string().optional(),
  city: z.string().min(1, {
    message: "City is required",
  }),
  postalCode: z.string().optional(),
});
