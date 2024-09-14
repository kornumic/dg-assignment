export class User {
  id: string;
  email: string;
  hashedPassword: string | undefined;

  constructor(
    id: string,
    email: string,
    hashedPassword: string | undefined | null,
  ) {
    this.id = id;
    this.email = email;
    this.hashedPassword = hashedPassword ?? undefined;
  }
}

export interface NewUser {
  email: string;
  hashedPassword: string;
}
