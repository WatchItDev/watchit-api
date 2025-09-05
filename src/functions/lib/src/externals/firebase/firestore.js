'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CollectionDAO = void 0;
exports.FireStore = FireStore;
const firestore_1 = require('firebase-admin/firestore');
const app_1 = require('./app');
/**
 * A generic Firestore DAO.
 * T can be any shape (your GraphQL types, etc.).
 */
class CollectionDAO {
  admin;
  ref;
  constructor(path) {
    this.admin = (0, firestore_1.getFirestore)((0, app_1.App)().getAdmin());
    this.ref = this.admin.collection(path);
  }
  /* ---------- basic CRUD ---------- */
  async get(id) {
    const snap = await this.ref.doc(id).get();
    return snap.exists ? snap.data() : null;
  }
  async list(limit = 20) {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map((d) => d.data());
  }
  async create(id, data) {
    const parsedData = JSON.parse(JSON.stringify(data));
    await this.ref.doc(id).set(parsedData);
  }
  async update(id, data) {
    await this.ref.doc(id).update(data);
  }
  async delete(id) {
    await this.ref.doc(id).delete();
  }
  /* ---------- querying helpers ---------- */
  async ids(limit = 50) {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map((d) => d.id);
  }
  async query(clauses, options) {
    let q = this.ref;
    for (const c of clauses) q = q.where(c.field, c.op, c.value);
    if (options?.orderBy)
      q = q.orderBy(options.orderBy.field, options.orderBy.direction);
    if (options?.limit) q = q.limit(options.limit);
    const snap = await q.get();
    return snap.docs.map((d) => d.data());
  }
  /** Substring search based on a `keywords` array field. */
  async search(query, limit = 20, includeHidden = false) {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 10);
    if (!terms.length) return [];
    let q = this.ref.where('keywords', 'array-contains-any', terms);
    if (includeHidden) q = q.where('hidden', '==', false);
    if (limit) q = q.limit(limit);
    const snap = await q.get();
    return snap.docs.map((d) => d.data());
  }
  sub(id, sub) {
    const subPath = `${this.ref.path}/${id}/${sub}`;
    return new CollectionDAO(subPath);
  }
  async exists(id) {
    const snap = await this.ref.doc(id).get();
    return snap.exists;
  }
}
exports.CollectionDAO = CollectionDAO;
/** factory for your datasources */
function FireStore() {
  const fs = (path) => new CollectionDAO(path);
  return { fs };
}
//# sourceMappingURL=firestore.js.map
