import { getFirestore as getAdminFS } from 'firebase-admin/firestore';
import type {
  Firestore as AdminFS,
  CollectionReference,
  DocumentData,
  WithFieldValue,
  Query as FSQuery,
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

  /* ---------- basic CRUD ---------- */

  async get(id: string): Promise<T | null> {
    const snap = await this.ref.doc(id).get();
    return snap.exists ? (snap.data() as T) : null;
  }

  async list(limit = 20): Promise<T[]> {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map((d) => d.data() as T);
  }

  async create(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    const parsedData = JSON.parse(JSON.stringify(data));
    await this.ref.doc(id).set(parsedData);
  }

  async update(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    await this.ref.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    await this.ref.doc(id).delete();
  }

  /* ---------- querying helpers ---------- */

  async ids(limit = 50): Promise<string[]> {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map(d => d.id);
  }

  async query(
    clauses: Array<{ field: string; op: FirebaseFirestore.WhereFilterOp; value: unknown }>,
    options?: {
      limit?: number;
      orderBy?: { field: string; direction?: FirebaseFirestore.OrderByDirection };  // 'asc' | 'desc'
    },
  ): Promise<T[]> {
    let q: FSQuery<DocumentData> = this.ref;
    for (const c of clauses) q = q.where(c.field, c.op, c.value);
    if (options?.orderBy) q = q.orderBy(options.orderBy.field, options.orderBy.direction);
    if (options?.limit) q = q.limit(options.limit);
    const snap = await q.get();
    return snap.docs.map(d => d.data() as T);
  }

  /** Substring search based on a `keywords` array field. */
  async search(
      query: string,
      limit = 20,
      includeHidden = false,
  ): Promise<T[]> {
    const terms = query
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 10);

    if (!terms.length) return [];

    let q: FSQuery<DocumentData> = this.ref.where('keywords', 'array-contains-any', terms);
    if (includeHidden) q = q.where('hidden', '==', false);
    if (limit) q = q.limit(limit);

    const snap = await q.get();
    return snap.docs.map(d => d.data() as T);
  }

  sub(id: string, sub: string): CollectionDAO<T> {
    const subPath = `${this.ref.path}/${id}/${sub}`;
    return new CollectionDAO<T>(subPath);
  }

  async exists(id: string): Promise<boolean> {
    const snap = await this.ref.doc(id).get();
    return snap.exists;
  }
}

/** factory for your datasources */
export function FireStore() {
  const fs = <U>(path: string): CollectionDAO<U> => new CollectionDAO<U>(path);
  return { fs };
}
