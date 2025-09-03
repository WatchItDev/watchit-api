import { randomUUID } from "crypto";
import { EventLog } from "@/schema/types";

export function makeNewLog(data: Omit<EventLog, "id" | "createdAt">): EventLog {
  return {
    id: `${randomUUID()}`,
    ...data,
    createdAt: Date.now(),
  };
}
