import { auth } from "@/lib/next-auth/auth";
import { UserServiceFactory } from "@/server/service/UserService.factory";
import { User } from "@/server/model/User";

export const getAuthUser = async (): Promise<User | undefined> => {
  const session = await auth();

  if (session && session.user && session.user.email) {
    const userService = await new UserServiceFactory().getUserService();
    return userService.getUserByEmail(session.user.email);
  }
  return undefined;
};
