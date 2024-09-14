import { User } from "next-auth";
import { credentialsSchema } from "@/lib/next-auth/credentials/schemas.zod";
import { compareHashedPasswords } from "@/lib/encryption/passwords";
import { UserService } from "@/service/UserService";
import { UserDrizzleRepository } from "@/repository/UserRepository";
import { db } from "@/lib/drizzle";

export const loginCredentialsHandler = async (
  credentials: any,
): Promise<User | null> => {
  const { email, password } = await credentialsSchema.parseAsync(credentials);
  const userService = new UserService(new UserDrizzleRepository(db));
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
  console.log("User logged in", user);
  return {
    id: user.id,
    email: user.email,
  };
};
