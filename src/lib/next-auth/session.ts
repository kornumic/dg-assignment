import { auth } from "@/lib/next-auth/auth";
import { db } from "@/lib/drizzle";
import { UserService } from "@/server/service/UserService";
import { UserDrizzleRepository } from "@/server/repository/UserRepository";

export const getAuthUser = async () => {
  const session = await auth();

  if (session && session.user && session.user.email) {
    const userService = new UserService(new UserDrizzleRepository(db));
    return userService.getUserByEmail(session.user.email);
  }
  return undefined;
};
