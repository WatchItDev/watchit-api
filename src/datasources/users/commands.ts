import { DataSourceManager } from '../manager'
import type {UpdateUserInput, User, UserInput} from '../../schema/types'
import { makeNewUser } from '../../models/user';
import { buildKeywords, stripNulls } from '../../externals/firebase/utils';
import { FirestoreUser } from "../../externals/firebase/types";
import { AuthData } from "../../types";
import { FieldValue } from 'firebase-admin/firestore';

const USER_PREFIX_FIELDS = ['username', 'displayName', 'bio'];
const USER_WHOLE_FIELDS  = ['address'];

export class UsersCommands extends DataSourceManager {
    async createUser(input: UserInput & AuthData): Promise<User> {
        const user = makeNewUser(input);
        const keywords = buildKeywords(user, USER_PREFIX_FIELDS, USER_WHOLE_FIELDS);
        const record: FirestoreUser = { ...user, keywords };
        await this.fs<FirestoreUser>('users').create(user.address, record)
        return user
    }

    async updateUser(
        address: string,
        patch: Partial<Omit<UpdateUserInput, 'address' | 'createdAt'>> & { currentRank?: string },
    ): Promise<User> {
        const dao = this.fs<FirestoreUser>('users');
        const current = await dao.get(address);

        if (!current) throw new Error(`User ${address} not found`);

        const cleanPatch = stripNulls(patch);
        const nextDoc: Partial<FirestoreUser> = { ...cleanPatch };

        if (typeof cleanPatch.profilePicture === 'string'
            && cleanPatch.profilePicture
            && cleanPatch.profilePicture !== current.profilePicture) {
            nextDoc.profilePictureOriginal = cleanPatch.profilePicture;
        }

        if (typeof cleanPatch.coverPicture === 'string'
            && cleanPatch.coverPicture
            && cleanPatch.coverPicture !== current.coverPicture) {
            nextDoc.coverPictureOriginal = cleanPatch.coverPicture;
        }

        const merged = { ...current, ...nextDoc };
        console.log('merged user data:', merged);
        const keywords = buildKeywords(merged, USER_PREFIX_FIELDS, USER_WHOLE_FIELDS);
        const timestamp = Date.now();
        const updateDoc = { ...nextDoc, keywords, updatedAt: timestamp };
        const { keywords: _k, ...publicUser } = { ...merged, updatedAt: timestamp };

        await dao.update(address, updateDoc);

        return publicUser as User;
    }

    async updateCounterField(
        address: string,
        field: keyof Pick<User,'followersCount'|'followingCount'|'publicationsCount'|'bookmarksCount'|'xpBalance'|'xpTotal'>,
        delta: number
    ): Promise<void> {
        const dao = this.fs<User>('users') as any;
        await dao.ref.doc(address)
            .update({ [field]: FieldValue.increment(delta) });
    }
}
