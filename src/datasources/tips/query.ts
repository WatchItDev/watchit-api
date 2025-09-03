import { DataSourceManager } from "../manager";
import { Tip as FirestoreTip } from "../../schema/types";

export class TipsQuery extends DataSourceManager {
  async getTipsForPost(postId: string, limit = 100): Promise<FirestoreTip[]> {
    return this.fs<FirestoreTip>("tips").query(
      [{ field: "postId", op: "==", value: postId }],
      { orderBy: { field: "createdAt", direction: "desc" }, limit },
    );
  }

  async getUserTipsHistory(
    address: string,
    limit = 100,
  ): Promise<FirestoreTip[]> {
    return this.fs<FirestoreTip>("tips").query(
      [{ field: "baker", op: "==", value: address }],
      { orderBy: { field: "createdAt", direction: "desc" }, limit },
    );
  }

  async getCreatorTips(address: string, limit = 100): Promise<FirestoreTip[]> {
    return this.fs<FirestoreTip>("tips").query(
      [{ field: "creator", op: "==", value: address }],
      { orderBy: { field: "createdAt", direction: "desc" }, limit },
    );
  }
}
