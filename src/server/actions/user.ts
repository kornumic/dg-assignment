"use server";

import { CredentialsSchema } from "@/lib/next-auth/credentials/schemas.zod";
import { hashSaltPassword } from "@/lib/encryption/passwords";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/next-auth/auth";
import { CredentialsSignin } from "next-auth";
import { UserServiceFactory } from "@/server/service/UserService.factory";
import { UserActionResponse } from "@/server/actions/user.zod";

const login = async (formData: FormData) => {
  const { email, password } = CredentialsSchema.parse(
    Object.fromEntries(formData),
  );

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const credentialsError = error as CredentialsSignin;
    return credentialsError.cause;
  }
  redirect("/");
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

export { login, register };
