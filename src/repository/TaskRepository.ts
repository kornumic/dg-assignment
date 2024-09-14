import { DrizzleDbType } from "@/lib/drizzle";
import { desc, eq } from "drizzle-orm";
import { NewTask, Task } from "@/model/Task";
import { tasks, TasksInferSelect } from "@/lib/drizzle/schema/tasks/schema";
import { generateEntityId } from "@/lib/encryption/entityIds";

export interface TasksRepository {
  getTaskById(taskId: string): Promise<Task | undefined>;

  getTasksByOwnerId(
    ownerId: string,
    limit: number,
    offset: number,
  ): Promise<Task[]>;

  createTask(task: NewTask): Promise<Task>;
}

export class TasksDrizzleRepository implements TasksRepository {
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
  ): Promise<Task[]> => {
    const existingTasks = await this.drizzle.query.tasks.findMany({
      where: () => eq(tasks.owner_id, ownerId),
      orderBy: () => desc(tasks.created_at),
      limit: limit,
      offset: offset * limit,
    });

    return existingTasks.map(this.extractTaskSelect);
  };

  public createTask = async (task: NewTask): Promise<Task> => {
    const id = generateEntityId();
    const now = new Date();
    const insertedTask = {
      id: id,
      title: task.title,
      description: task.description,
      completed: false,
      created_at: now,
      owner_id: task.ownerId,
    };

    await this.drizzle.insert(tasks).values(insertedTask);
    return new Task(insertedTask);
  };
}
