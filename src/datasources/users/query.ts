import { DataSourceManager } from "../manager";
import type { User } from "../../schema/types";

export class UsersQuery extends DataSourceManager {
  getUser = async (addr: string): Promise<User | null> =>
    this.fs<User>("users").get(addr);

  getUsers = async (q: string, limit = 50): Promise<User[]> => {
    if (!q) return [];
    return this.fs<User>("users").search(q, limit, false);
  };

  async getUserById(id: string): Promise<User | null> {
    const [u] = await this.fs<User>("users").query(
      [{ field: "id", op: "==", value: id.toLowerCase() }],
      { limit: 1 },
    );
    return u ?? null;
  }

  async topByXp(limit = 100): Promise<User[]> {
    return this.fs<User>("users").query([], {
      orderBy: { field: "xpTotal", direction: "desc" },
      limit,
    });
  }
}
