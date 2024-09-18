import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";
import { FormCard } from "@/components/custom/form/FormCard";
import { SignInForm } from "@/components/custom/form/SignInForm";

const SignIn = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex w-full justify-center items-center py-16">
      <div className="flex w-1/3 justify-center">
        <FormCard
          cardTitle={"Sign In"}
          cardDescription={"Your Tasks are waiting for you"}
        >
          <SignInForm />
        </FormCard>
      </div>
    </div>
  );
};

export default SignIn;
