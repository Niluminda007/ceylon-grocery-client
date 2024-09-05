import * as z from "zod";
import { AddReview } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Review } from "@prisma/client";

export type InputType = z.infer<typeof AddReview>;
export type ReturnType = ActionState<InputType, Review>;
