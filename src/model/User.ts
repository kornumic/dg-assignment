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

export class NewUser {
  email: string;
  hashedPassword: string;

  constructor(email: string, hashedPassword: string) {
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}

export interface UserInsert {
  email: string;
  hashedPassword: string;
}

export interface UserSelect {
  id: string;
  email: string;
  hashedPassword: string | undefined;
}
