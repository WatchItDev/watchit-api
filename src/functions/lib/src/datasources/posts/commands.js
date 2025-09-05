'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PostsCommands = void 0;
const manager_1 = require('../manager');
const post_1 = require('../../models/post');
const utils_1 = require('../../externals/firebase/utils');
const firestore_1 = require('firebase-admin/firestore');
const POST_PREFIX_FIELDS = ['title', 'description'];
const POST_WHOLE_FIELDS = ['id', 'cid'];
class PostsCommands extends manager_1.DataSourceManager {
  async createPost(address, input) {
    const dao = this.fs('posts');
    const ref = dao.ref.doc();
    const id = ref.id;
    const record = (0, post_1.makeNewPost)(id, address, input);
    const keywords = (0, utils_1.buildKeywords)(
      { ...record, id },
      POST_PREFIX_FIELDS,
      POST_WHOLE_FIELDS,
    );
    const fsRecord = { ...record, keywords };
    await ref.set(fsRecord);
    return record;
  }
  async updatePost(postId, patch) {
    const dao = this.fs('posts');
    const current = await dao.get(postId);
    if (!current) throw new Error(`Post ${postId} not found`);
    const cleanPatch = (0, utils_1.stripNulls)(patch);
    const merged = { ...current, ...cleanPatch };
    const keywords = (0, utils_1.buildKeywords)(
      merged,
      POST_PREFIX_FIELDS,
      POST_WHOLE_FIELDS,
    );
    const timestamp = Date.now();
    const updateDoc = { ...cleanPatch, keywords, updatedAt: timestamp };
    await dao.update(postId, updateDoc);
    const { keywords: _k, ...publicPost } = {
      ...updateDoc,
      updatedAt: timestamp,
    };
    return publicPost;
  }
  async hidePost(postId) {
    const dao = this.fs('posts');
    await dao.ref.doc(postId).update({
      hidden: true,
      updatedAt: Date.now(),
    });
  }
  async updateCounterField(postId, field, delta) {
    const dao = this.fs('posts');
    await dao.ref
      .doc(postId)
      .update({ [field]: firestore_1.FieldValue.increment(delta) });
  }
}
exports.PostsCommands = PostsCommands;
//# sourceMappingURL=commands.js.map
