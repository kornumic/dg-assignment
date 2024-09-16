"use client";

import { register as signup } from "@/server/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignUpFormType,
  SignUpFormSchema,
  UserActionResponse,
} from "@/server/actions/user.zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUpForm = () => {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormType) => {
    let result: UserActionResponse | undefined;
    try {
      result = await signup({
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
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="shadcn" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="flex w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
