import type { User, UserInput } from '@/schema/types';

export function defaultUserData(): Omit<
    User,
    'address' | 'username' | 'displayName' | 'bio' |
    'profilePicture' | 'coverPicture' | 'socialLinks' |
    'createdAt' | 'updatedAt'
> {
    return {
        followersCount:   0,
        followingCount:   0,
        publicationsCount:0,
        verified:         false,
    };
}

export function makeNewUser(input: UserInput): User {
    const now = Date.now();
    return {
        ...defaultUserData(),
        address:        input.address,
        username:       input.username,
        displayName:    input.displayName,
        bio:            input.bio,
        profilePicture: input.profilePicture ?? '',
        coverPicture:   input.coverPicture ?? '',
        socialLinks:    input.socialLinks ?? [],
        createdAt:      now,
        updatedAt:      now,
    };
}
