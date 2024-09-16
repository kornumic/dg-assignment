import { UserService } from "@/server/service/UserService";
import { UserDrizzleRepository } from "@/server/repository/UserRepository";
import { dbConnection } from "@/lib/drizzle";

export class UserServiceFactory {
  public getUser = async (): Promise<UserService> => {
    return new UserService(new UserDrizzleRepository(await dbConnection()));
  };
}
