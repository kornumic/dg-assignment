"use server";

import { CredentialsSchema } from "@/lib/next-auth/credentials/schemas.zod";
import { hashSaltPassword } from "@/lib/encryption/passwords";
import { signIn, signOut } from "@/lib/next-auth/auth";
import { UserServiceFactory } from "@/server/service/UserService.factory";
import { UserActionResponse } from "@/server/actions/user.zod";

const login = async (formData: {
  email: string;
  password: string;
}): Promise<UserActionResponse> => {
  const { email, password } = CredentialsSchema.parse(formData);

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    console.log("Could not sign in: ", error);
    return {
      success: false,
      errors: [
        {
          field: "email",
          message: "Invalid credentials.",
        },
      ],
    };
  }
  return { success: true, errors: [] };
};

const logout = async () => {
  await signOut({
    redirect: false,
  });
};

const register = async (formData: {
  email: string;
  password: string;
}): Promise<UserActionResponse> => {
  const { email, password } = await CredentialsSchema.parseAsync(formData);

  const userService = await new UserServiceFactory().getUser();
  const dbUser = await userService.getUserByEmail(email);

  if (!!dbUser) {
    return {
      success: false,
      errors: [
        {
          field: "email",
          message: "User already exists.",
        },
      ],
    };
  }

  const hashedPassword = await hashSaltPassword(password);
  await userService.createUser({ email, hashedPassword });

  return { success: true, errors: [] };
};

export { login, logout, register };
