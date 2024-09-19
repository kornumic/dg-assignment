"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";

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
import { login } from "@/server/actions/auth";
import { SignInFormSchema, SignInFormType } from "@/lib/zod/user.zod";
import { toast } from "sonner";
import React from "react";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit = async (data: SignInFormType) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      console.log("result", result);

      if (!result.success) {
        toast("Login failed, invalid credentials");
        if (result.code !== 500) {
          form.setError("email", {
            message: result.error,
          });
        }
      } else if (result.success) {
        router.push("/home");
      } else {
        toast("Login failed, please try again");
      }
    } catch (error) {
      console.error("error", error);
      toast("Something went wrong");
      return;
    }
  };

  return (
    <div className="flex flex-col w-full">
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
                <FormMessage />
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
            className="flex w-full bg-sky-600 hover:bg-sky-800"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          <div className="flex flex-row justify-center space-x-1 text-sm">
            <p>{"Don't have an account? Sign up"}</p>
            <Link className="text-sky-600 font-bold" href="/signup">
              here
            </Link>
            .
          </div>
        </form>
      </Form>
    </div>
  );
};
