import * as z from "zod";
import { AddFeedback } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Feedback } from "@prisma/client";

export type InputType = z.infer<typeof AddFeedback>;
export type ReturnType = ActionState<InputType, Feedback>;
