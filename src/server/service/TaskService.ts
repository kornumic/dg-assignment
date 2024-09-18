import { TaskRepository } from "@/server/repository/TaskRepository";
import { NewTask, Task } from "@/server/model/Task";

export class TaskService {
  tasksRepository: TaskRepository;

  constructor(tasksRepository: TaskRepository) {
    this.tasksRepository = tasksRepository;
  }

  public getUsersTasks = async (
    userId: string,
    options: {
      pageSize: number;
      page: number;
      query?: string;
      sort?: "asc" | "desc";
      completed?: boolean;
    },
  ): Promise<{
    metadata: {
      page: number;
      pageSize: number;
      totalPages: number;
      totalTasks: number;
    };
    tasks: Task[];
  }> => {
    if (options.page < 0) {
      throw new Error("Page number must be greater than 0");
    }

    const tasksByOwnerId = await this.tasksRepository.getTasksByOwnerId(
      userId,
      options.pageSize,
      options.page,
      options?.query,
      options?.sort,
      options?.completed,
    );

    const totalPages = Math.ceil(
      tasksByOwnerId.metadata.count / options.pageSize,
    );
    return {
      metadata: {
        page: options.page,
        pageSize: options.pageSize,
        totalPages: totalPages,
        totalTasks: tasksByOwnerId.metadata.count,
      },
      tasks: tasksByOwnerId.tasks,
    };
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
