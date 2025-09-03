import { DataSourceManager } from "../manager";
import type { User } from "../../schema/types";

export class FollowsQuery extends DataSourceManager {
  isFollowing(follower: string, following: string) {
    return this.fs("follows").exists(`${follower}_${following}`);
  }

  async followersOf(address: string, limit = 50): Promise<User[]> {
    const rows = await this.fs<{ follower: string }>("follows").query(
      [{ field: "following", op: "==", value: address }],
      { limit },
    );
    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs<User>("users").get(r.follower)),
    );
    return users.filter(Boolean) as User[];
  }

  async followingOf(address: string, limit = 50): Promise<User[]> {
    const rows = await this.fs<{ following: string }>("follows").query(
      [{ field: "follower", op: "==", value: address }],
      { limit },
    );
    if (!rows.length) return [];
    const users = await Promise.all(
      rows.map((r) => this.fs<User>("users").get(r.following)),
    );
    return users.filter(Boolean) as User[];
  }
}
