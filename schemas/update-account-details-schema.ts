import * as z from "zod";

export const UpdateAccountDetailsSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  telephone: z.string().min(10, "Telephone number must be at least 10 digits"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});
