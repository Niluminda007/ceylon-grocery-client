"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { AddFeedback } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        error: "Unauthorized! You have to be logged in to add feedback",
      };
    }

    const { score, comment } = data;

    const existingUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return {
        error: "User does not exist",
      };
    }

    const feedback = await db.feedback.create({
      data: {
        userId: user.id,
        rating: score,
        comment,
      },
    });

    return {
      data: feedback,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Unable to add feed back",
    };
  }
};

export const addFeedback = createSafeAction(AddFeedback, handler);
