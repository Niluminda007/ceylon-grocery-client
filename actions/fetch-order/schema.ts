import * as z from "zod";

export const FetchOrder = z.object({
  orderId: z.string({
    required_error: "order id required",
  }),
});
