"use server";

import { credentialsSchema } from "@/lib/next-auth/credentials/schemas";
import { hashSaltPassword } from "@/lib/encryption/passwords";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/next-auth/auth";
import { CredentialsSignin } from "next-auth";
import { UserService } from "@/service/UserService";
import { UserDrizzleRepository } from "@/repository/UserRepository";
import { db } from "@/lib/drizzle";

const login = async (formData: FormData) => {
  const { email, password } = await credentialsSchema.parseAsync(
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

const register = async (formData: FormData) => {
  const { email, password } = await credentialsSchema.parseAsync(
    Object.fromEntries(formData),
  );

  const userService = new UserService(new UserDrizzleRepository(db));

  const dbUser = await userService.getUserByEmail(email);

  if (!!dbUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashSaltPassword(password);
  await userService.createUser({ email, hashedPassword });

  redirect("/login");
};

export { login, register };
