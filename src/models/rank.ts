import { Rank, RankInput } from "@/schema/types";

export function makeRank(input: RankInput): Rank {
  const now = Date.now();
  return {
    ...input,
    createdAt: now,
    updatedAt: now,
  };
}
