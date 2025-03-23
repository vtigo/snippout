
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserDTO {
  name?: string;
  email?: string;
}

export class UserService {
  async getAll(): Promise<User[]> {
    return [{ id: "1", name: "John Doe", email: "john@example.com" }];
  }

  async getOne(userId: string): Promise<User | null> {
    return { id: userId, name: "John Doe", email: "john@example.com" };
  }

  async create(dto: UserDTO): Promise<User> {
    if (!dto.name || !dto.email) {
      throw new Error("Name and email are required");
    }

    return {
      id: Math.random().toString(36).substring(7),
      name: dto.name,
      email: dto.email
    };
  }

  async update(userId: string, dto: UserDTO): Promise<User | null> {
    const user = await this.getOne(userId);
    if (!user) return null;

    return {
      ...user,
      ...dto
    };
  }

  async delete(userId: string): Promise<boolean> {
    const user = await this.getOne(userId);
    if (!user) return false;

    return true;
  }
}