"use server";

import { signIn, signOut } from "@/lib/next-auth/auth";
import {
  ActionResponse,
  errorResponse,
  successResponse,
} from "@/server/actions/middleware";

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
    console.log("Could not sign in: ", error);
    return errorResponse(["Invalid credentials"], 401);
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
    return errorResponse(["Could not sign out"], 500);
  }
  return successResponse(undefined);
};

export { login, logout };
