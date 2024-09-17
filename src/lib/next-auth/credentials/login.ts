import { User } from "next-auth";
import { CredentialsSchema } from "@/lib/next-auth/credentials/schemas.zod";
import { compareHashedPasswords } from "@/lib/encryption/passwords";
import { UserServiceFactory } from "@/server/service/UserService.factory";

export const loginCredentialsHandler = async (
  credentials: any,
): Promise<User | null> => {
  const { email, password } = await CredentialsSchema.parseAsync(credentials);

  const userService = await new UserServiceFactory().getUserService();
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error("Authentication failed.");
  }
  if (!user.hashedPassword) {
    throw new Error("Wrong authentication method for this email.");
  }
  if (!(await compareHashedPasswords(password, user.hashedPassword))) {
    throw new Error("Authentication failed.");
  }
  console.debug(`User ${user.email} logged in`);
  return {
    id: user.id,
    email: user.email,
  };
};
