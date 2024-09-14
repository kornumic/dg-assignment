import { db, DrizzleDbType } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema/users/schema";
import { eq } from "drizzle-orm";
import { NewUser, User } from "@/model/User";
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
    db.insert(users).values({
      id: id,
      email: user.email,
      password: user.hashedPassword,
    });

    return new User(id, user.email, user.hashedPassword);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const existingUser = await this.drizzle.query.users.findFirst({
      where: () => eq(users.email, email),
    });

    if (!existingUser) {
      return undefined;
    }

    return new User(existingUser.id, existingUser.email, existingUser.password);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const existingUser = await this.drizzle.query.users.findFirst({
      where: () => eq(users.id, id),
    });

    if (!existingUser) {
      return undefined;
    }

    return new User(existingUser.id, existingUser.email, existingUser.password);
  }
}
