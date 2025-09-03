import { DataSourceManager } from "../manager";
import type { XPEntry } from "../../models/xp";

export class XPQuery extends DataSourceManager {
  async getHistory(
    address: string,
    limit = 50,
    offset = 0,
  ): Promise<XPEntry[]> {
    const rows = await this.fs<XPEntry>("xpEntries").query(
      [{ field: "user", op: "==", value: address }],
      {
        limit,
        orderBy: { field: "createdAt", direction: "desc" },
      },
    );
    return rows.slice(offset);
  }
}
