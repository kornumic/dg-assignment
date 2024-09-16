import { NewUser, User } from "@/server/model/User";
import { UserRepository } from "@/server/repository/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: NewUser): Promise<User> {
    return this.userRepository.createUser(user);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.getUserById(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.getUserByEmail(email);
  }
}
