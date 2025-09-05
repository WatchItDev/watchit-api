import { DataSourceManager } from '../manager';
import { Tip as FirestoreTip } from '../../schema/types';
import crypto from 'crypto';

export class TipsCommands extends DataSourceManager {
  async createTip(
    record: Omit<FirestoreTip, 'id' | 'createdAt'> & { createdAt?: number },
  ): Promise<FirestoreTip> {
    const dao = this.fs<FirestoreTip>('tips');

    const now = Date.now();
    const base = {
      postId: record.postId,
      creator: record.creator,
      baker: record.baker,
      amount: record.amount,
      txHash: record.txHash ?? null,
      message: record.message ?? null,
      createdAt: record.createdAt ?? now,
    };

    if (record.txHash) {
      const stableId = `${base.baker}_${record.txHash}`;
      if (!(await dao.exists(stableId))) {
        await dao.create(stableId, { ...base, id: stableId });
      }
      return (await dao.get(stableId)) as FirestoreTip;
    }

    const id = crypto.randomUUID();
    await dao.create(id, { ...base, id });
    return (await dao.get(id)) as FirestoreTip;
  }
}
