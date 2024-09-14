import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginCredentialsHandler } from "@/lib/next-auth/credentials/login";
import { ENV } from "@/lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: loginCredentialsHandler,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: ENV.AUTH_URL,
  pages: {
    signIn: "/login",
  },
});
