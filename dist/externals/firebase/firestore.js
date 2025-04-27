import { getFirestore as getAdminFS } from "firebase-admin/firestore";
import { App } from "./app";
class CollectionDAO {
  admin;
  ref;
  constructor(path) {
    this.admin = getAdminFS(App().getAdmin());
    this.ref = this.admin.collection(path);
  }
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
  async ids(limit = 50) {
    const snap = await this.ref.limit(limit).get();
    return snap.docs.map((d) => d.id);
  }
  async query(clauses, limit) {
    let q = this.ref;
    for (const c of clauses) q = q.where(c.field, c.op, c.value);
    if (limit) q = q.limit(limit);
    const snap = await q.get();
    return snap.docs.map((d) => d.data());
  }
  async prefixSearch(field, prefix, limit = 20) {
    return this.query(
      [
        { field, op: ">=", value: prefix },
        { field, op: "<=", value: prefix + "\uF8FF" }
      ],
      limit
    );
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
function FireStore() {
  const fs = (path) => new CollectionDAO(path);
  return { fs };
}
export {
  CollectionDAO,
  FireStore
};
//# sourceMappingURL=firestore.js.map