export class Task {
  id: string;
  title: string;
  description: string | undefined;
  completed: boolean;
  ownerId: string;
  createdAt: Date;

  constructor(taskSelect: TaskSelect) {
    this.id = taskSelect.id;
    this.title = taskSelect.title;
    this.description = taskSelect.description;
    this.completed = taskSelect.completed;
    this.ownerId = taskSelect.owner_id;
    this.createdAt = taskSelect.created_at;
  }
}

export interface NewTask {
  title: string;
  description?: string;
  completed: string;
  ownerId: string;
}

export interface TaskSelect {
  id: string;
  title: string;
  description: string | undefined;
  completed: boolean;
  owner_id: string;
  created_at: Date;
}
