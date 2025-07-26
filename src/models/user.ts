import type { User, UserInput } from '@/schema/types';
import {AuthData} from "@/types";

export function defaultUserData(): Omit<
    User,
    'address' | 'email' | 'id' | 'username' | 'displayName' | 'bio' |
    'profilePicture' | 'coverPicture' | 'socialLinks' | 'profilePictureOriginal' |
    'createdAt' | 'updatedAt' | 'coverPictureOriginal'
> {
    return {
        followersCount: 0,
        followingCount: 0,
        publicationsCount: 0,
        bookmarksCount: 0,
        xpBalance: 0,
        xpTotal:   0,
        currentRank: '',
        verified: false,
    };
}

export function makeNewUser(input: UserInput & AuthData): User {
    const now = Date.now();
    return {
        ...defaultUserData(),
        ...input,
        id:             input.id ?? '',
        email:          input.email ?? '',
        profilePicture: input.profilePicture ?? '',
        profilePictureOriginal: input.profilePicture ?? '',
        coverPicture:   input.coverPicture ?? '',
        coverPictureOriginal:   input.coverPicture ?? '',
        socialLinks:    input.socialLinks ?? [],
        createdAt:      now,
        updatedAt:      now,
    };
}
