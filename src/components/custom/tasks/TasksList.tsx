"use client";

import { TasksListHeader } from "@/components/custom/tasks/TasksListHeader";
import { Task } from "@/server/model/Task";

export type TasksListProps = {
  tasks: Task[] | undefined;
};

export const TasksList = (props: TasksListProps) => {
  return (
    <div className="flex flex-col w-full px-36">
      <TasksListHeader />
      {
        <ul>
          {props.tasks?.map((task) => (
            <li key={task.id}>
              <p>{task.title}</p>
              <p>{task.description}</p>
              <p>{task.completed.toString()}</p>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};
