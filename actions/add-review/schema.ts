import * as z from "zod";

export const AddReview = z.object({
  productId: z.string().min(1, { message: "product Id is required" }),
  score: z
    .number({
      required_error: "score is required",
    })
    .min(1, { message: "score must be at least 1" })
    .max(5, { message: "score must be at most 5" }),
  comment: z
    .string({
      required_error: "comment is required",
    })
    .min(5, { message: "comment must be at least 5 characters long" }),
});
