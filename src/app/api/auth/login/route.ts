import { signIn } from "@/lib/next-auth/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { credentialsSchema } from "@/lib/next-auth/credentials/schemas";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
  const body = await req.json();
  console.log("Logging in with credentials", body);
  const { email, password } = await credentialsSchema.parseAsync(body);
  console.log("Logging in with credentials", email);
  await signIn("credentials", {
    redirect: false,
    callbackUrl: "/",
    email,
    password,
  });
};
