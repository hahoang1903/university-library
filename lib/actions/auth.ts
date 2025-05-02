"use server";

import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { AuthCredentials } from "@/types/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { uploadUniversityCard } from "../aws/s3";

export const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = credentials;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "You have successfully signed in" };
  } catch (error: any) {
    console.log("Sign in error:", error);
    return {
      success: false,
      message:
        error?.cause?.err?.message ?? "Sign in error. Please try again later",
    };
  }
};

export const signUp = async (credentials: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } =
    credentials;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length) {
    return { success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const universityCardKey = await uploadUniversityCard(
      email,
      universityId,
      universityCard
    );

    await db.insert(usersTable).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard: universityCardKey,
    });

    const { success, message } = await signInWithCredentials(credentials);
    return {
      success,
      message: success ? "You have successfully signed up" : message,
    };
  } catch (error) {
    console.log("Signup error:", error);
    return {
      success: false,
      message: "Signup error. Please try again later",
    };
  }
};
