import { UserRank } from "@/schema/types";

export function makeUserRank(user: string, rankId: string): UserRank {
  return { user, rankId, achievedAt: Date.now() };
}
