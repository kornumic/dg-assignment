import { TaskService } from "@/service/TaskService";
import { TasksDrizzleRepository } from "@/repository/TaskRepository";
import { db } from "@/lib/drizzle";
import { getAuthUser } from "@/lib/next-auth/session";
import { NextRequest, NextResponse } from "next/server";
import { UserDrizzleRepository } from "@/repository/UserRepository";
import { UserService } from "@/service/UserService";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userService = new UserService(new UserDrizzleRepository(db));
  const user = await userService.getUserByEmail(authUser.email);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const taskService = new TaskService(new TasksDrizzleRepository(db));
  const tasks = await taskService.getUsersTasks(user.id);

  return NextResponse.json(tasks, { status: 200 });
};
