import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/next-auth/session";

import { UpdateTaskSchema } from "@/app/api/tasks/[taskId]/schemas.zod";
import { TaskServiceFactory } from "@/server/service/TaskService.factory";

export const GET = async ({ params }: { params: { taskId: string } }) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskService = await new TaskServiceFactory().getTaskService();
  const task = await taskService.getTaskById(params.taskId);

  if (task && task.ownerId !== authUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } else if (!task) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(task, { status: 200 });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { taskId: string } },
) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const updateData = UpdateTaskSchema.safeParse(body);
  if (!updateData.success) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const taskService = await new TaskServiceFactory().getTaskService();
  const task = await taskService.getTaskById(params.taskId);

  if (!task) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  if (task.ownerId !== authUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updatedTask = await taskService.updateTask(
    params.taskId,
    updateData.data,
  );
  return NextResponse.json(updatedTask, { status: 200 });
};

export const DELETE = async ({ params }: { params: { taskId: string } }) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskService = await new TaskServiceFactory().getTaskService();
  const task = await taskService.getTaskById(params.taskId);
  if (!task) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }
  if (task.ownerId !== authUser.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await taskService.deleteTask(params.taskId);
};
