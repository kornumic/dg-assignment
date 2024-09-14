import { register } from "@/actions/user";

const SignupPage = () => {
  return (
    <div>
      <h1>Signup</h1>
      <form action={register}>
        email
        <input id={"email"} type={"email"} name={"email"} />
        password
        <input id={"password"} type={"password"} name={"password"} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignupPage;
