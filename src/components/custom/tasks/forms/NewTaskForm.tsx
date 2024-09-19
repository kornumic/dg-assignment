"use client";

import { useForm } from "react-hook-form";
import { NewTaskFormSchema, NewTaskType } from "@/lib/zod/task.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postTask } from "@/server/actions/task";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const NewTaskForm = () => {
  const router = useRouter();

  const form = useForm<NewTaskType>({
    resolver: zodResolver(NewTaskFormSchema),
  });

  const onSubmit = async (data: NewTaskType) => {
    try {
      const result = await postTask({
        title: data.title,
        description: data.description,
      });
      console.log("result", result);

      if (result.success && result.data) {
        router.push(`/tasks`);
        toast("Task has been created");
      } else {
        toast("Task creation failed");
      }
    } catch (error) {
      console.error("error", error);
      toast("Something went wrong");
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="New Task" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your description here"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full bg-sky-600 hover:bg-sky-800"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Creating..." : "Create Task"}
        </Button>
      </form>
    </Form>
  );
};
