import { TaskService } from "@/service/TaskService";
import { TasksDrizzleRepository } from "@/repository/TaskRepository";
import { db } from "@/lib/drizzle";
import { getAuthUser } from "@/lib/next-auth/session";
import { NextRequest, NextResponse } from "next/server";
import { newTaskSchema } from "@/model/Task";

export const GET = async () => {
  const authUser = await getAuthUser();
  if (!authUser || !authUser.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskService = new TaskService(new TasksDrizzleRepository(db));
  const tasks = await taskService.getUsersTasks(authUser.id);

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
