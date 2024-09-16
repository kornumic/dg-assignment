import { getAuthUser } from "@/lib/next-auth/session";
import { NextRequest, NextResponse } from "next/server";

import { GetTasksSearchOptionsSchema } from "@/app/api/tasks/schemas.zod";
import { NewTaskSchema } from "@/app/api/tasks/[taskId]/schemas.zod";
import { TaskServiceFactory } from "@/server/service/TaskService.factory";

export const GET = async (req: NextRequest) => {
  console.log(
    JSON.stringify(Object.fromEntries(req.nextUrl.searchParams.entries())),
  );
  const optionsData = GetTasksSearchOptionsSchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams.entries()),
  );
  if (!optionsData.success) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const options = {
    ...optionsData.data,
  };

  const authUser = await getAuthUser();
  if (!authUser || !authUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskService = await new TaskServiceFactory().getTaskService();
  const tasks = await taskService.getUsersTasks(authUser.id, options);

  return NextResponse.json(tasks, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newTaskData = NewTaskSchema.safeParse(body);
  if (!newTaskData.success) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const taskService = await new TaskServiceFactory().getTaskService();
  const task = await taskService.createTask({
    ...newTaskData.data,
    completed: false,
    ownerId: authUser.id,
  });

  return NextResponse.json(task, { status: 201 });
};
