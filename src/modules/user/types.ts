import { type Repo } from '@/infra/database';
import type { SocialPlatform } from '@/modules/social/types';
export type User = Repo.UserGetPayload<{ include: { profile: true } }>;

export type CreateProfileDTO = {
  address: string;
  bio: string;
  email: string;
  cover?: string;
  displayName: string;
  picture?: string;
  socials?: SocialPlatform[];
  username: string;
};

export type UpdateProfileDTO = {
  bio?: string;
  cover?: string;
  displayName?: string;
  picture?: string;
  socials?: SocialPlatform[];
} & UserId;

export type RepoCreateUser = {
  bio: string;
  email: string;
  address: string;
  username: string;
  displayName: string;
  picture?: string;
  cover?: string;
};

export type RepoUpdateUser = {
  bio?: string;
  displayName?: string;
  picture?: string;
  cover?: string;
} & UserId;

export type UserByIdentifier = Tools.ExactlyOne<
  {
    id: number;
    email: string;
    address: string;
  },
  'address' | 'email' | 'id'
>;
