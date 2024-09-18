"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { UpdateTaskFormSchema, UpdateTaskFormType } from "@/lib/zod/task.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteTask, patchTask } from "@/server/actions/task";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const UpdateTaskForm = ({ task }: { task: Task }) => {
  const router = useRouter();
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

  const handleDeleteTask = async () => {
    try {
      const result = await deleteTask({
        id: task.id,
      });

      if (result.success && result.data) {
        toast("Task has been deleted");
        router.push("/tasks");
      } else {
        toast("Task deletion failed");
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
        <div className="flex flex-row space-x-4 w-full items-end">
          <div className="w-full">
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
                        <SelectItem value="notCompleted">
                          Not completed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex w-full " variant={"destructive"}>
                Delete Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete task {task.title}</DialogTitle>
                <DialogDescription>
                  You are about to delete this Task. This action cannot be
                  undone. Are you sure you want to delete this task?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant={"secondary"}>Cancel</Button>
                <Button
                  variant={"destructive"}
                  type="submit"
                  onClick={handleDeleteTask}
                >
                  Delete Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
