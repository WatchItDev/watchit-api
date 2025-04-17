import { getFirestore as getAdminFS } from 'firebase-admin/firestore';
import type {
  Firestore as AdminFS,
  CollectionReference,
  DocumentData,
} from 'firebase-admin/firestore';
import { App } from './app';

const admin: AdminFS = getAdminFS(App().getAdmin());

export interface BaseDoc {
  id?: string; // added on reads
}

export class CollectionDAO<T extends BaseDoc> {
  constructor(private ref: CollectionReference<DocumentData>) {}

  async get(id: string): Promise<T | null> {
    const snap = await this.ref.doc(id).get();
    return snap.exists ? ({ id, ...(snap.data() as T) } as T) : null;
  }

  async list(limit = 20): Promise<T[]> {
    const qSnap = await this.ref.limit(limit).get();
    return qSnap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  }

  async create(id: string, data: Omit<T, 'id'>) {
    await this.ref.doc(id).set(data);
  }

  async update(id: string, data: Partial<Omit<T, 'id'>>) {
    await this.ref.doc(id).update(data);
  }

  async delete(id: string) {
    await this.ref.doc(id).delete();
  }

  /** Helper for sub‑collections: posts/{id}/likes/{user} */
  sub(id: string, sub: string) {
    return this.ref.doc(id).collection(sub);
  }
}

/** Factory so datasources can do:  this.fs<User>('users')  */
export const fs = <T extends BaseDoc>(path: string) =>
    new CollectionDAO<T>(admin.collection(path));
