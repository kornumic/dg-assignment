import { User } from "next-auth";
import { signInSchema } from "@/features/authentication/schemas";
import { selectUserByEmail } from "@/entities/user/repository";
import { compareHashedPasswords } from "@/lib/encryption/passwords";

export const loginHandler = async (credentials: any): Promise<User | null> => {
  const { email, password } = await signInSchema.parseAsync(credentials);
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
  return {
    id: user.id,
    email: user.email,
  };
};
