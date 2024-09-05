import * as z from "zod";
import { FetchOrder } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { ExtendedOrder, PrismaOrder } from "@/types/order";

export type InputType = z.infer<typeof FetchOrder>;
export type ReturnType = ActionState<InputType, ExtendedOrder>;
