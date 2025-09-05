import { DataSourceManager } from '../manager';
import type {
  Post,
  CreatePostInput,
  UpdatePostInput,
} from '../../schema/types';
import { makeNewPost } from '../../models/post';
import { buildKeywords, stripNulls } from '../../externals/firebase/utils';
import { FirestorePost } from '../../externals/firebase/types';
import { FieldValue } from 'firebase-admin/firestore';

const POST_PREFIX_FIELDS = ['title', 'description'];
const POST_WHOLE_FIELDS = ['id', 'cid'];

export class PostsCommands extends DataSourceManager {
  async createPost(address: string, input: CreatePostInput): Promise<Post> {
    const dao = this.fs<Post>('posts') as any;
    const ref = dao.ref.doc();
    const id = ref.id;

    const record = makeNewPost(id, address, input);
    const keywords = buildKeywords(
      { ...record, id },
      POST_PREFIX_FIELDS,
      POST_WHOLE_FIELDS,
    );
    const fsRecord: FirestorePost = { ...record, keywords };

    await ref.set(fsRecord);
    return record;
  }

  async updatePost(
    postId: string,
    patch: Partial<Omit<UpdatePostInput, 'postId'>>,
  ): Promise<Post> {
    const dao = this.fs('posts');
    const current = await dao.get(postId);
    if (!current) throw new Error(`Post ${postId} not found`);

    const cleanPatch = stripNulls(patch);
    const merged = { ...current, ...cleanPatch };
    const keywords = buildKeywords(
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
    return publicPost as Post;
  }

  async hidePost(postId: string): Promise<void> {
    const dao = this.fs<Post>('posts') as any;
    await dao.ref.doc(postId).update({
      hidden: true,
      updatedAt: Date.now(),
    });
  }

  async updateCounterField(
    postId: string,
    field: keyof Pick<
      Post,
      'commentCount' | 'likeCount' | 'bookmarkCount' | 'viewCount'
    >,
    delta: number,
  ): Promise<void> {
    const dao = this.fs<Post>('posts') as any;
    await dao.ref.doc(postId).update({ [field]: FieldValue.increment(delta) });
  }
}
