import { getFirestore as getAdminFS }    from 'firebase-admin/firestore';
import type {
  Firestore as AdminFS,
  CollectionReference,
  DocumentData,
  WithFieldValue,
  Query as FSQuery,
  QuerySnapshot,
} from 'firebase-admin/firestore';
import { App } from './app';

/**
 * A generic Firestore DAO.
 * T can be any shape (your GraphQL types, etc.).
 */
export class CollectionDAO<T> {
  protected admin: AdminFS;
  protected ref: CollectionReference<DocumentData>;

  constructor(path: string) {
    this.admin = getAdminFS(App().getAdmin());
    this.ref   = this.admin.collection(path);
  }

  async get(id: string): Promise<T | null> {
    const snap = await this.ref.doc(id).get();
    return snap.exists ? (snap.data() as T) : null;
  }

  async list(limit = 20): Promise<T[]> {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map((d) => d.data() as T);
  }

  async create(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    await this.ref.doc(id).set(data)
  }

  async update(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    await this.ref.doc(id).update(data)
  }

  async delete(id: string): Promise<void> {
    await this.ref.doc(id).delete();
  }

  /** run an arbitrary query + optional limit */
  async query(
    clauses: Array<{ field: string; op: FirebaseFirestore.WhereFilterOp; value: unknown }>,
    limit?: number
  ): Promise<T[]> {
    let q: FSQuery<DocumentData> = this.ref;
    for (const c of clauses) q = q.where(c.field, c.op, c.value);
    if (limit) q = q.limit(limit);
    const snap: QuerySnapshot = await q.get();
    return snap.docs.map((d) => d.data() as T);
  }

  /** common “prefix search” pattern */
  async prefixSearch(
    field: string,
    prefix: string,
    limit = 20
  ): Promise<T[]> {
    return this.query(
      [
        { field, op: '>=', value: prefix },
        { field, op: '<=', value: prefix + '\uf8ff' },
      ],
      limit
    );
  }

  /** sub‑collection helper */
  sub(id: string, sub: string) {
    return this.ref.doc(id).collection(sub);
  }
}

/** factory for your datasources */
export function FireStore() {
  const fs = <U>(path: string): CollectionDAO<U> => new CollectionDAO<U>(path);
  return { fs };
}
