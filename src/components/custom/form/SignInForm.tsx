"use client";

import { login } from "@/server/actions/user";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInFormSchema,
  SignInFormType,
  UserActionResponse,
} from "@/server/actions/user.zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data: SignInFormType) => {
    let result: UserActionResponse | undefined;
    try {
      result = await login({
        email: data.email,
        password: data.password,
      });
      console.log("result", result);
    } catch (error) {
      console.error("error", error);
      return;
    }

    if (result.errors.length > 0) {
      result.errors.forEach((error) => {
        form.setError(error.field, { message: error.message });
      });
    }
    if (result.success) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@email.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex w-full bg-sky-600"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          <div className="flex flex-row justify-center space-x-1 text-sm">
            <p>{"Don't have an account? Sign up"}</p>
            <Link className="text-sky-500 font-bold" href="/signup">
              here
            </Link>
            .
          </div>
        </form>
      </Form>
    </div>
  );
};
