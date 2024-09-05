import * as z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, {
    message: " name is required",
  }),
  email: z.string().email({
    message: "Valid email is required",
  }),
  message: z.string({
    message: "message can't be empty",
  }),
});
