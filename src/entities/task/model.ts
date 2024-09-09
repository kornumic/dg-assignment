export interface TaskSelect {
  id: string;
  title: string;
  description: string | undefined;
  status: boolean;
  ownerId: string;
  createdAt: Date;
}

export interface TaskInsert {
  title: string;
  description?: string;
  status: string;
  ownerId: string;
}
