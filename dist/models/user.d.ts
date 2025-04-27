import { User, UserInput } from '../schema/types.js';
import 'graphql';

declare function defaultUserData(): Omit<User, 'address' | 'username' | 'displayName' | 'bio' | 'profilePicture' | 'coverPicture' | 'socialLinks' | 'createdAt' | 'updatedAt'>;
declare function makeNewUser(input: UserInput): User;

export { defaultUserData, makeNewUser };
