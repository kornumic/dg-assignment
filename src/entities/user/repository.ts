import { db } from "@/lib/drizzle";
import { users, UsersInferSelect } from "@/lib/drizzle/schema/users/schema";
import { eq, or } from "drizzle-orm";
import { UserInsert, UserSelect } from "@/entities/user/model";
import { generateEntityId } from "@/lib/encryption/entityIds";

const extractUserSelect = (user: UsersInferSelect): UserSelect => ({
  id: user.id,
  email: user.email,
  hashedPassword: user.password ? user.password : undefined,
});

/**
 * Get a user by their email address.
 * @param email
 */
export const selectUserByEmail = async (
  email: string,
): Promise<UserSelect | null> => {
  const existingUsers: UsersInferSelect[] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, email)));

  if (existingUsers.length === 0) {
    return null;
  }
  return extractUserSelect(existingUsers[0]);
};

/**
 * Create a new user. Generates a new entity ID and inserts the user into the database.
 * @param user
 */
export const createUser = async (user: UserInsert) => {
  await db.insert(users).values({
    id: generateEntityId(),
    email: user.email,
    password: user.hashedPassword,
  });
};
