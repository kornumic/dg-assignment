import { TasksRepository } from "@/repository/TaskRepository";
import { NewTask, Task } from "@/model/Task";

export class TaskService {
  tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  public getUsersTasks = async (
    userId: string,
    options: {
      limit: number;
      offset: number;
      query?: string;
      sort?: "asc" | "desc";
      completed?: boolean;
    },
  ): Promise<Task[]> => {
    return await this.tasksRepository.getTasksByOwnerId(
      userId,
      options.limit,
      options.offset,
      options?.query,
      options?.sort,
      options?.completed,
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
