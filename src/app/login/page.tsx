import { login } from "@/actions/user";

const SignIn = () => {
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
