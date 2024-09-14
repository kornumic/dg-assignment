import { TasksRepository } from "@/repository/TaskRepository";

export class TaskService {
  tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  public getUsersTasks = async (
    userId: string,
    options:
      | undefined
      | {
          limit: number;
          offset: number;
          query?: string;
          sort?: "asc" | "desc";
          filter?: {
            completed: boolean;
          };
        } = {
      limit: 10,
      offset: 0,
    },
  ) => {
    console.log("Getting tasks for user", userId);
    return await this.tasksRepository.getTasksByOwnerId(
      userId,
      options.limit,
      options.offset,
    );
  };

  public getTaskById = async (taskId: string) => {
    return await this.tasksRepository.getTaskById(taskId);
  };
}
