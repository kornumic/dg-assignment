import { TaskService } from "@/server/service/TaskService";
import { TaskDrizzleRepository } from "@/server/repository/TaskRepository";
import { dbConnection } from "@/lib/drizzle";

export class TaskServiceFactory {
  public getTaskService = async (): Promise<TaskService> => {
    return new TaskService(new TaskDrizzleRepository(await dbConnection()));
  };
}
