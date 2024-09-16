import SignUpForm from "@/components/custom/form/SignUpForm";
import { auth } from "@/lib/next-auth/auth";
import { redirect } from "next/navigation";
import { FormCard } from "@/components/custom/form/FormCard";

const SignupPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex w-full justify-center py-16">
      <FormCard
        cardTitle={"Sign Up"}
        cardDescription={"Sign up to Tasks today"}
      >
        <SignUpForm />
      </FormCard>
    </div>
  );
};

export default SignupPage;
