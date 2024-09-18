"use server";

import { User } from "@/server/model/User";
import { Task } from "@/server/model/Task";
import {
  ActionResponse,
  errorResponse,
  requireAuth,
  successResponse,
} from "@/server/actions/middleware";
import { TaskServiceFactory } from "@/server/service/TaskService.factory";

export type GetAllTasksOptions = {
  page: number;
  pageSize: number;
  query?: string;
  sort?: "asc" | "desc";
  completed?: boolean;
};

export type GetAllTasksData = {
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
  tasks: Task[];
};

export const getAllTasks = requireAuth(
  async (
    data: GetAllTasksOptions,
    sessionUser: User,
  ): Promise<ActionResponse<GetAllTasksData | undefined>> => {
    const taskService = await new TaskServiceFactory().getTaskService();
    const usersTasks = await taskService.getUsersTasks(sessionUser.id, {
      ...data,
      page: data.page - 1,
    });

    return successResponse({
      pagination: {
        page: usersTasks.metadata.page + 1,
        pageSize: usersTasks.metadata.pageSize,
        totalPages: usersTasks.metadata.totalPages,
      },
      tasks: usersTasks.tasks,
    });
  },
);

export type GetTaskData = {
  taskId: string;
};

export const getTask = requireAuth(
  async (
    data: GetTaskData,
    sessionUser: User,
  ): Promise<ActionResponse<Task | undefined>> => {
    const taskService = await new TaskServiceFactory().getTaskService();
    const task = await taskService.getTaskById(data.taskId);

    if (!task) {
      return errorResponse(["Task not found"], 404);
    }

    if (task.ownerId !== sessionUser.id) {
      return errorResponse(["Forbidden"], 403);
    }

    return successResponse(task);
  },
);

export type PostTaskData = {
  id: string;
  title: string;
};

export const postTask = requireAuth(
  async (
    data: { title: string; description: string | undefined },
    sessionUser: User,
  ): Promise<ActionResponse<PostTaskData | undefined>> => {
    const taskService = await new TaskServiceFactory().getTaskService();

    try {
      const task = await taskService.createTask({
        ...data,
        completed: false,
        ownerId: sessionUser.id,
      });
      return successResponse({
        id: task.id,
        title: task.title,
      });
    } catch (error) {
      return errorResponse(["An unknown error occurred"], 500);
    }
  },
);

export type PatchTaskData = {
  id: string;
  title: string;
};

export const patchTask = requireAuth(
  async (
    data: {
      id: string;
      title: string;
      description: string | undefined;
      completed: boolean;
    },
    sessionUser: User,
  ): Promise<ActionResponse<PatchTaskData | undefined>> => {
    const taskService = await new TaskServiceFactory().getTaskService();

    const task = await taskService.getTaskById(data.id);
    if (!task) {
      return errorResponse(["Task not found"], 404);
    }
    if (task.ownerId !== sessionUser.id) {
      return errorResponse(["Forbidden"], 403);
    }

    try {
      const updatedTask = await taskService.updateTask(data.id, {
        title: data.title,
        description: data.description,
        completed: data.completed,
      });
      return successResponse({
        id: updatedTask.id,
        title: updatedTask.title,
      });
    } catch (error) {
      return errorResponse(["An unknown error occurred"], 500);
    }
  },
);

export type DeleteTaskData = {
  id: string;
};

export const deleteTask = requireAuth(
  async (
    data: DeleteTaskData,
    sessionUser: User,
  ): Promise<ActionResponse<DeleteTaskData | undefined>> => {
    const taskService = await new TaskServiceFactory().getTaskService();

    const task = await taskService.getTaskById(data.id);
    if (!task) {
      return errorResponse(["Task not found"], 404);
    }
    if (task.ownerId !== sessionUser.id) {
      return errorResponse(["Forbidden"], 403);
    }

    try {
      await taskService.deleteTask(data.id);
      return successResponse(data);
    } catch (error) {
      return errorResponse(["An unknown error occurred"], 500);
    }
  },
);
