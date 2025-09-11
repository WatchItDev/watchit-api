import { EventLog } from '@/schema/types';
import { randomUUID } from 'crypto';

export function makeNewLog(data: Omit<EventLog, 'id' | 'createdAt'>): EventLog {
  return {
    id: `${randomUUID()}`,
    ...data,
    createdAt: Date.now(),
  };
}
