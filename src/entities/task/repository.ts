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

export const selectTaskById = async (
  taskId: string,
): Promise<TaskSelect | undefined> => {
  const existingTasks = await db.query.tasks.findFirst({
    where: () => eq(tasks.id, taskId),
  });

  if (!existingTasks) {
    return undefined;
  }
  return extractTaskSelect(existingTasks);
};

export const selectTasksByOwnerId = async (
  ownerId: string,
  limit: number,
  offset: number,
): Promise<TaskSelect[]> => {
  const existingTasks = await db.query.tasks.findMany({
    where: () => eq(tasks.owner_id, ownerId),
    orderBy: () => desc(tasks.created_at),
    limit: limit,
    offset: offset * limit,
  });

  return existingTasks.map(extractTaskSelect);
};
