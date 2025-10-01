import type { Bucket } from '@google-cloud/storage';
import type { Storage } from 'firebase-admin/storage';
import { getStorage } from 'firebase-admin/storage';
import { App } from './app';

export function createFirebaseStorage(path: string) {
  const admin = App().getAdmin();
  const storage: Storage = getStorage(admin);
  const bucket: Bucket = storage.bucket();

  async function upload(file: Buffer): Promise<void> {
    const bucketFile = bucket.file(path);
    await bucketFile.save(file);
  }

  async function url(): Promise<string> {
    const bucketFile = bucket.file(path);
    const [signedUrl] = await bucketFile.getSignedUrl({
      action: 'read',
      expires: '03-09-2100',
    });
    return signedUrl;
  }

  return { upload, url };
}

export function FireStorage() {
  return {
    ref: (path: string) => createFirebaseStorage(path),
  };
}

export type FireStorage = ReturnType<typeof FireStorage>;
