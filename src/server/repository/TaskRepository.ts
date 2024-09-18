import { DrizzleDbType } from "@/lib/drizzle";
import { and, asc, desc, eq, ilike, sql } from "drizzle-orm";
import { NewTask, Task } from "@/server/model/Task";
import { tasks, TasksInferSelect } from "@/lib/drizzle/schema/tasks/schema";
import { generateEntityId } from "@/lib/encryption/entityIds";

export interface TaskRepository {
  getTaskById(taskId: string): Promise<Task | undefined>;

  getTasksByOwnerId(
    ownerId: string,
    limit: number,
    offset: number,
    query?: string,
    sort?: "asc" | "desc",
    completed?: boolean,
  ): Promise<{
    metadata: {
      count: number;
    };
    tasks: Task[];
  }>;

  createTask(task: NewTask): Promise<Task>;

  updateTask(taskId: string, task: Task): Promise<Task>;

  deleteTask(taskId: string): Promise<void>;
}

export class TaskDrizzleRepository implements TaskRepository {
  private drizzle: DrizzleDbType;

  constructor(db: DrizzleDbType) {
    this.drizzle = db;
  }

  private extractTaskSelect = (task: TasksInferSelect): Task => ({
    id: task.id,
    title: task.title,
    description: task.description ? task.description : undefined,
    completed: task.completed,
    ownerId: task.owner_id,
    createdAt: task.created_at,
  });

  getTaskById = async (taskId: string): Promise<Task | undefined> => {
    const existingTasks = await this.drizzle.query.tasks.findFirst({
      where: () => eq(tasks.id, taskId),
    });

    if (!existingTasks) {
      return undefined;
    }
    return this.extractTaskSelect(existingTasks);
  };

  public getTasksByOwnerId = async (
    ownerId: string,
    limit: number,
    offset: number,
    query?: string,
    sort?: "asc" | "desc",
    completed?: boolean,
  ): Promise<{
    metadata: {
      count: number;
    };
    tasks: Task[];
  }> => {
    // Create an array of conditions that are defined
    let whereConditions = [
      eq(tasks.owner_id, ownerId),
      query ? ilike(tasks.title, `%${query}%`) : undefined,
      completed !== undefined ? eq(tasks.completed, completed) : undefined,
    ].filter((c) => c !== undefined);

    const existingTasks = await this.drizzle.query.tasks.findMany({
      where: () => {
        return and(...whereConditions);
      },
      orderBy: () =>
        sort && sort === "asc" ? asc(tasks.created_at) : desc(tasks.created_at),
      limit: limit,
      offset: offset * limit,
    });

    const tasksCount = (
      await this.drizzle
        .select({
          count: sql<number>`cast(count(${tasks.id}) as int)`,
        })
        .from(tasks)
        .where(() => {
          return and(...whereConditions);
        })
        .execute()
    )[0].count;

    return {
      metadata: {
        count: tasksCount,
      },
      tasks: existingTasks.map(this.extractTaskSelect),
    };
  };

  public createTask = async (task: NewTask): Promise<Task> => {
    const id = generateEntityId();
    const now = new Date();
    const insertedTask = {
      id: id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      created_at: now,
      owner_id: task.ownerId,
    };

    await this.drizzle.insert(tasks).values(insertedTask);
    return {
      id: id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      ownerId: task.ownerId,
      createdAt: now,
    };
  };

  public updateTask = async (taskId: string, task: Task): Promise<Task> => {
    if (taskId !== task.id) {
      throw new Error("Task ID does not match the task object ID");
    }

    const result = await this.drizzle
      .update(tasks)
      .set({
        title: task.title,
        description: task.description,
        completed: task.completed,
      })
      .where(eq(tasks.id, task.id))
      .execute();

    if (result.rowCount && result.rowCount !== 1) {
      console.warn(
        `Exactly one task should have been affected, instead ${result.rowCount} were affected`,
      );
    }
    return task;
  };

  public deleteTask = async (taskId: string): Promise<void> => {
    await this.drizzle.delete(tasks).where(eq(tasks.id, taskId));
  };
}
