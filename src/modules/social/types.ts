export { Social } from '@/infra/database';

export type SocialPlatform = { platform: string; url: string };
export type RepoCreateBatchSocial = { platforms: SocialPlatform[] } & UserId;
export type RepoDeleteBatchSocial = UserId; // delete many by user id

export type SocialFilter = Tools.AtLeastOne<
  {
    id: number;
    platform: string;
  } & UserId,
  'id' | 'platform' | 'userId'
>;
