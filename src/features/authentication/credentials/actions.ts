"use server";

import {
  credentialsSigninSchema,
  credentialsSignupSchema,
} from "@/features/authentication/credentials/schemas";
import { createUser, selectUserByEmail } from "@/entities/user/repository";
import { hashSaltPassword } from "@/lib/encryption/passwords";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/next-auth/auth";
import { CredentialsSignin } from "next-auth";

const login = async (formData: FormData) => {
  let data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const { email, password } = await credentialsSigninSchema.parseAsync(data);

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

const register = async (formData: FormData) => {
  let data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const { email, password } = await credentialsSignupSchema.parseAsync(data);

  const dbUser = await selectUserByEmail(email);

  if (!!dbUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashSaltPassword(password);
  await createUser({ email, hashedPassword });

  redirect("/login");
};

export { login, register };
