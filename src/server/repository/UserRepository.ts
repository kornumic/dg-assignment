import { DrizzleDbType } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema/users/schema";
import { eq } from "drizzle-orm";
import { NewUser, User } from "@/server/model/User";
import { generateEntityId } from "@/lib/encryption/entityIds";

export interface UserRepository {
  createUser(user: NewUser): Promise<User>;

  getUserByEmail(email: string): Promise<User | undefined>;

  getUserById(id: string): Promise<User | undefined>;
}

export class UserDrizzleRepository implements UserRepository {
  private drizzle: DrizzleDbType;

  constructor(db: DrizzleDbType) {
    this.drizzle = db;
  }

  async createUser(user: NewUser): Promise<User> {
    const id = generateEntityId();
    await this.drizzle.insert(users).values({
      id: id,
      email: user.email,
      password: user.hashedPassword,
    });

    return {
      id: id,
      email: user.email,
      hashedPassword: user.hashedPassword,
    } as User;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const existingUser = await this.drizzle.query.users.findFirst({
      where: () => eq(users.email, email),
    });

    if (!existingUser) {
      return undefined;
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
      hashedPassword: existingUser.password,
    } as User;
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const existingUser = await this.drizzle.query.users.findFirst({
      where: () => eq(users.id, id),
    });

    if (!existingUser) {
      return undefined;
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
      hashedPassword: existingUser.password,
    } as User;
  }
}
