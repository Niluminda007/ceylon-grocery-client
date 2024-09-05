"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth-schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { User } from "@prisma/client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }
  const { email, password, telephone, firstName, lastName } =
    validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error: "Email already in use",
    };
  }

  const newUser: User = await db.user.create({
    data: {
      firstName,
      lastName,
      name: firstName + lastName,
      email,
      password: hashedPassword,
      telephone,
    },
  });
  if (!newUser) {
    return {
      error: "error creating the user",
    };
  }
  await signIn("credentials", {
    email: newUser.email,
    password: password,
    redirect: false,
  });
  return {
    success: "Account created Successfully!",
    url: DEFAULT_LOGIN_REDIRECT,
  };
};
