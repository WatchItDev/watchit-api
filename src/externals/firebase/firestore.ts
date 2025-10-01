import type {
  Firestore as AdminFS,
  CollectionReference,
  DocumentData,
  Query as FSQuery,
  WithFieldValue,
} from 'firebase-admin/firestore';
import { getFirestore as getAdminFS } from 'firebase-admin/firestore';
import { App } from './app';

export function createCollectionDAO<T>(path: string) {
  const admin: AdminFS = getAdminFS(App().getAdmin());
  const ref: CollectionReference<DocumentData> = admin.collection(path);

  /* ---------- basic CRUD ---------- */
  async function get(id: string): Promise<T | null> {
    const snap = await ref.doc(id).get();
    return snap.exists ? (snap.data() as T) : null;
  }

  async function list(limit = 20): Promise<T[]> {
    const snap = await ref.limit(limit).get();
    return snap.docs.map((d) => d.data() as T);
  }

  async function create(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    // Firestore no admite valores undefined ni clases, por eso stringify+parse
    const parsed = JSON.parse(JSON.stringify(data));
    await ref.doc(id).set(parsed);
  }

  async function update(id: string, data: Partial<WithFieldValue<T>>): Promise<void> {
    await ref.doc(id).update(data);
  }

  async function remove(id: string): Promise<void> {
    await ref.doc(id).delete();
  }

  /* ---------- helpers ---------- */
  async function ids(limit = 50): Promise<string[]> {
    const snap = await ref.limit(limit).get();
    return snap.docs.map((d) => d.id);
  }

  async function query(
    clauses: Array<{ field: string; op: FirebaseFirestore.WhereFilterOp; value: unknown }>,
    options?: {
      limit?: number;
      orderBy?: { field: string; direction?: FirebaseFirestore.OrderByDirection };
    },
  ): Promise<T[]> {
    let q: FSQuery<DocumentData> = ref;
    for (const c of clauses) q = q.where(c.field, c.op, c.value);
    if (options?.orderBy) q = q.orderBy(options.orderBy.field, options.orderBy.direction);
    if (options?.limit) q = q.limit(options.limit);

    const snap = await q.get();
    return snap.docs.map((d) => d.data() as T);
  }

  async function search(queryStr: string, limit = 20, includeHidden = false): Promise<T[]> {
    const terms = queryStr.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 10);
    if (!terms.length) return [];

    let q: FSQuery<DocumentData> = ref.where('keywords', 'array-contains-any', terms);
    if (!includeHidden) q = q.where('hidden', '==', false);
    if (limit) q = q.limit(limit);

    const snap = await q.get();
    return snap.docs.map((d) => d.data() as T);
  }

  function sub(id: string, subCollection: string) {
    const subPath = `${ref.path}/${id}/${subCollection}`;
    return createCollectionDAO<T>(subPath);
  }

  async function exists(id: string): Promise<boolean> {
    const snap = await ref.doc(id).get();
    return snap.exists;
  }

  return {
    get,
    list,
    create,
    update,
    remove,
    ids,
    query,
    search,
    sub,
    exists,
  };
}

export function FireStore() {
  return {
    fs: <U>(path: string) => createCollectionDAO<U>(path),
  };
}

export type FireStore = ReturnType<typeof FireStore>;
