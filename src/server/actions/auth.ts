"use server";

import { signIn, signOut } from "@/lib/next-auth/auth";
import {
  ActionResponse,
  errorResponse,
  successResponse,
} from "@/server/actions/middleware";
import { CredentialsSignin } from "next-auth";

export type LoginData = {
  email: string;
  password: string;
};

const login = async (data: LoginData): Promise<ActionResponse<undefined>> => {
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `Could not sign in with email ${data.email}: `,
        error.message,
      );
      return errorResponse("Invalid credentials", 400);
    }
    return errorResponse("Could not sign in", 500);
  }
  return successResponse(undefined);
};

const logout = async (): Promise<ActionResponse<undefined>> => {
  try {
    await signOut({
      redirect: false,
    });
  } catch (error) {
    console.log("Could not sign out: ", error);
    return errorResponse("Could not sign out", 500);
  }
  return successResponse(undefined);
};

export { login, logout };
