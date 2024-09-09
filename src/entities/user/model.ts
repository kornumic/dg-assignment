export interface UserInsert {
  email: string;
  hashedPassword: string;
}

export interface UserSelect {
  id: string;
  email: string;
  hashedPassword: string | undefined;
}
