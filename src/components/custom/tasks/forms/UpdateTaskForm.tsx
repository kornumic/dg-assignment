"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UpdateTaskFormSchema, UpdateTaskFormType } from "@/lib/zod/task.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchTask } from "@/server/actions/task";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Task } from "@/server/model/Task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UpdateTaskForm = ({ task }: { task: Task }) => {
  const form = useForm<UpdateTaskFormType>({
    resolver: zodResolver(UpdateTaskFormSchema),
  });

  const onSubmit = async (data: UpdateTaskFormType) => {
    try {
      const result = await patchTask({
        id: task.id,
        title: data.title,
        description: data.description,
        completed: data.completed === "completed",
      });
      console.log("result", result);

      if (result.success && result.data) {
        toast("Task has been updated");
      } else {
        toast("Task modification failed");
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
          defaultValue={task.title}
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
          defaultValue={task.description}
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

        <FormField
          control={form.control}
          name={"completed"}
          defaultValue={task.completed ? "completed" : "notCompleted"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="notCompleted">Not completed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full bg-sky-600 hover:bg-sky-800"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Task"}
        </Button>
      </form>
    </Form>
  );
};
