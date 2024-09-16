import { login } from "@/server/actions/user";
import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <form action={login}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
};

export default SignIn;
