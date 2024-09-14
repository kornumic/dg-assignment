import { auth } from "@/lib/next-auth/auth";

export const getAuthUser = async () => {
  const session = await auth();

  if (session && session.user && session.user.email) {
    return {
      email: session.user.email,
    };
  }
  return undefined;
};
