import { Bucket } from '@google-cloud/storage';
import { getStorage, Storage } from "firebase-admin/storage";
import { App } from './app';


export class FirebaseStorage {
    protected admin: Storage;
    protected bucket: Bucket;
    protected path: string;

    constructor(path: string) {
        const admin = App().getAdmin();
        this.admin = getStorage(admin);
        this.bucket = this.admin.bucket()
        this.path = path;
    }

    async upload(file: Buffer): Promise<void> {
        // 'file' comes from the Blob or File API
        const bucketFile = this.bucket.file(this.path)
        return bucketFile.save(file)

    }

    async url(): Promise<string> {
        const bucketFile = this.bucket.file(this.path)
        const [url] = await bucketFile.getSignedUrl({
            action: 'read',
            expires: '03-09-2100' 
        });
        return url;

    }
}


/** factory for your datasources */
export function FireStorage() {
    const ref = (ref: string): FirebaseStorage => new FirebaseStorage(ref);
    return { ref };
}

export type FireStorage = ReturnType<typeof FireStorage>;
