import { User } from "next-auth";
import { credentialsSigninSchema } from "@/features/authentication/credentials/schemas";
import { selectUserByEmail } from "@/entities/user/repository";
import { compareHashedPasswords } from "@/lib/encryption/passwords";

export const loginCredentialsHandler = async (
  credentials: any,
): Promise<User | null> => {
  const { email, password } =
    await credentialsSigninSchema.parseAsync(credentials);
  const user = await selectUserByEmail(email);
  if (!user) {
    throw new Error("Authentication failed.");
  }
  if (!user.hashedPassword) {
    throw new Error("Wrong authentication method for this email.");
  }
  if (!(await compareHashedPasswords(password, user.hashedPassword))) {
    throw new Error("Authentication failed.");
  }
  console.log("User logged in", user);
  return {
    id: user.id,
    email: user.email,
  };
};
