export interface Task {
  id: string;
  title: string;
  description: string | undefined;
  completed: boolean;
  ownerId: string;
  createdAt: Date;
}

export interface NewTask {
  title: string;
  description?: string;
  completed: boolean;
  ownerId: string;
}
