import { DataSourceManager } from "../manager";
import { FieldValue } from "firebase-admin/firestore";
import { makeNewPost } from "../../models/post";
class PostsCommands extends DataSourceManager {
  async createPost(authorAddress, input) {
    const dao = this.fs("posts");
    const ref = dao.ref.doc();
    const id = ref.id;
    const record = makeNewPost(id, authorAddress, input);
    await ref.set(record);
    return record;
  }
  async updatePost(postId, patch) {
    await this.fs("posts").update(postId, {
      ...patch,
      updatedAt: Date.now()
    });
    return this.fs("posts").get(postId);
  }
  async deletePost(postId) {
    await this.fs("posts").delete(postId);
  }
  async updateCounterField(postId, field, delta) {
    const dao = this.fs("posts");
    await dao.ref.doc(postId).update({ [field]: FieldValue.increment(delta) });
  }
}
export {
  PostsCommands
};
//# sourceMappingURL=commands.js.map