import { db } from "@/lib/drizzle";
import { desc, eq } from "drizzle-orm";
import { TaskSelect } from "@/entities/task/model";
import { tasks, TasksInferSelect } from "@/lib/drizzle/schema/tasks/schema";

const extractTaskSelect = (task: TasksInferSelect): TaskSelect => ({
  id: task.id,
  title: task.title,
  description: task.description ? task.description : undefined,
  status: task.completed,
  ownerId: task.owner_id,
  createdAt: task.created_at,
});

export const getTaskById = async (
  taskId: string,
): Promise<TaskSelect | undefined> => {
  const existingTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, taskId));

  if (existingTasks.length === 0) {
    return undefined;
  }
  return extractTaskSelect(existingTasks[0]);
};

export const getTasksByOwnerId = async (
  ownerId: string,
  limit: number,
  offset: number,
): Promise<TaskSelect[]> => {
  const existingTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.owner_id, ownerId))
    .orderBy(desc(tasks.created_at))
    .limit(limit)
    .offset(offset);

  return existingTasks.map(extractTaskSelect);
};
