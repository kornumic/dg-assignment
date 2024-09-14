import { TasksRepository } from "@/repository/TaskRepository";
import { NewTask, Task } from "@/model/Task";

export class TaskService {
  tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  public getUsersTasks = async (
    userId: string,
    options?: {
      limit: number;
      offset: number;
      query?: string;
      sort?: "asc" | "desc";
      filter?: {
        completed: boolean;
      };
    },
  ): Promise<Task[]> => {
    const opts = {
      limit: options?.limit || 10,
      offset: options?.offset || 0,
    };

    return await this.tasksRepository.getTasksByOwnerId(
      userId,
      opts.limit,
      opts.offset,
    );
  };

  public getTaskById = async (taskId: string) => {
    return await this.tasksRepository.getTaskById(taskId);
  };

  public createTask = async (task: NewTask): Promise<Task> => {
    return await this.tasksRepository.createTask(task);
  };

  public updateTask = async (
    taskId: string,
    task: Partial<Task>,
  ): Promise<Task> => {
    const existingTask = await this.tasksRepository.getTaskById(taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }
    const updatedTask = { ...existingTask, ...task };

    return await this.tasksRepository.updateTask(taskId, updatedTask);
  };

  public deleteTask = async (taskId: string): Promise<void> => {
    return await this.tasksRepository.deleteTask(taskId);
  };
}
