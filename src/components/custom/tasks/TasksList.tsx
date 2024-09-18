"use client";

import { TasksListHeader } from "@/components/custom/tasks/TasksListHeader";
import { Task } from "@/server/model/Task";
import { TasksListFooter } from "@/components/custom/tasks/TasksListFooter";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  GetAllTasksSearchParams,
  GetAllTasksSearchParamsSchema,
} from "@/app/(protected)/tasks/schema.zod";

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
    <div className="flex flex-col w-full px-36">
      <TasksListHeader />
      {
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.completed.toString()}</p>
            </li>
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
