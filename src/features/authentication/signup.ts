import { signUpSchema } from "@/features/authentication/schemas";
import { hashSaltPassword } from "@/lib/encryption/passwords";
import { NextResponse } from "next/server";
import { createUser, selectUserByEmail } from "@/entities/user/repository";

export const signUpHandler = async (req: Request) => {
  const { email, password } = await signUpSchema.parseAsync(await req.json());
  const dbUser = await selectUserByEmail(email);

  if (!!dbUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }

  const hashedPassword = await hashSaltPassword(password);
  await createUser({ email, hashedPassword });

  return NextResponse.json({ message: "User created." }, { status: 201 });
};
