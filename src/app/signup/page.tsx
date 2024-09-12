import { register } from "@/features/authentication/credentials/actions";
import React from "react";

const SignupPage: React.FC = () => {
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
