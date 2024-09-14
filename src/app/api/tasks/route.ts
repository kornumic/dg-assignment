import { db } from "@/lib/drizzle";

import { TaskService } from "@/service/TaskService";
import { TasksDrizzleRepository } from "@/repository/TaskRepository";
import { getAuthUser } from "@/lib/next-auth/session";
import { NextRequest, NextResponse } from "next/server";

import { getTasksSearchOptionsSchema } from "@/app/api/tasks/schemas.zod";
import { newTaskSchema } from "@/app/api/tasks/[taskId]/schemas.zod";

export const GET = async (req: NextRequest) => {
  console.log(
    JSON.stringify(Object.fromEntries(req.nextUrl.searchParams.entries())),
  );
  const optionsData = getTasksSearchOptionsSchema.safeParse(
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

  const taskService = new TaskService(new TasksDrizzleRepository(db));
  const tasks = await taskService.getUsersTasks(authUser.id, options);

  return NextResponse.json(tasks, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newTaskData = newTaskSchema.safeParse(body);
  if (!newTaskData.success) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const taskService = new TaskService(new TasksDrizzleRepository(db));
  const task = await taskService.createTask({
    ...newTaskData.data,
    completed: false,
    ownerId: authUser.id,
  });

  return NextResponse.json(task, { status: 201 });
};
