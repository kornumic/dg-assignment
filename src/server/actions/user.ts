"use server";

import {
  ActionResponse,
  errorResponse,
  successResponse,
} from "@/server/actions/middleware";
import { UserServiceFactory } from "@/server/service/UserService.factory";
import { hashSaltPassword } from "@/lib/encryption/passwords";

export type RegisterData = {
  email: string;
  password: string;
};

export const createUser = async (
  data: RegisterData,
): Promise<ActionResponse<undefined>> => {
  const userService = await new UserServiceFactory().getUserService();
  const dbUser = await userService.getUserByEmail(data.email);

  if (!!dbUser) {
    return errorResponse("User already exists", 409);
  }

  const newUser = await userService.createUser({
    email: data.email,
    hashedPassword: await hashSaltPassword(data.password),
  });

  return successResponse(undefined);
};
