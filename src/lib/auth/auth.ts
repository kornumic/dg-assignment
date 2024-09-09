import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginHandler } from "@/features/authentication/login";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: loginHandler,
    }),
  ],
});
