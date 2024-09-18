"use client";

import { TasksListHeader } from "@/components/custom/tasks/lists/TasksListHeader";
import { Task } from "@/server/model/Task";
import { TasksListFooter } from "@/components/custom/tasks/lists/TasksListFooter";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  GetAllTasksSearchParams,
  GetAllTasksSearchParamsSchema,
} from "@/app/(protected)/tasks/schema.zod";
import { TasksListItem } from "@/components/custom/tasks/lists/TasksListItem";
import { Separator } from "@/components/ui/separator";

export const extractQueryParams = (
  readOnlyUrlSearchParams: ReadonlyURLSearchParams,
): GetAllTasksSearchParams => {
  const currentParams = GetAllTasksSearchParamsSchema.safeParse(
    Object.fromEntries(readOnlyUrlSearchParams),
  );

  if (currentParams.error) {
    console.log(JSON.stringify(currentParams.error));
    return {
      page: 1,
      pageSize: 10,
    } as GetAllTasksSearchParams;
  }

  return currentParams.data;
};

export type TasksListProps = {
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
  tasks: Task[];
};

export const TasksList = ({ pagination, tasks }: TasksListProps) => {
  return (
    <div className="flex flex-col items-center w-full px-36">
      <TasksListHeader />
      {
        <ul className="flex flex-col w-2/3 space-y-4">
          {tasks.map((task) => (
            <TasksListItem key={task.id} task={task} />
          ))}
          {tasks.length === 0 && <p>No tasks found</p>}
        </ul>
      }
      <div className="flex w-full">
        <TasksListFooter pagination={pagination} />
      </div>
    </div>
  );
};
