"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { AddReview } from "./schema";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
      return {
        error: "Unauthorized! You have to be logged in to add a review",
      };
    }

    const { productId, score, comment } = data;

    // Verify if the user ID exists in the database
    const existingUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return {
        error: "User does not exist",
      };
    }

    const review = await db.review.create({
      data: {
        productId,
        userId: user.id,
        rating: score,
        comment,
      },
    });

    await db.rating.create({
      data: {
        productId,
        userId: user.id,
        score,
      },
    });

    return {
      data: review,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Unable to add review",
    };
  }
};

export const addReview = createSafeAction(AddReview, handler);
