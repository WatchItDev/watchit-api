import { config } from 'dotenv';
config({ path: '../../.env' });

export * as usersTrigger from './triggers/users';
export * as postsTrigger from './triggers/posts';
export * as commentsTrigger from './triggers/comments';
export * as bookmarksTrigger from './triggers/bookmarks';
export * as followsTrigger from './triggers/follow';
export * as likesTrigger from './triggers/likes';
export * as xpTrigger from './triggers/xp';
export * as perksTrigger from './triggers/perks';
export * as logsTrigger from './triggers/logs';
export * as storageTrigger from './triggers/storage';
export * as processingTrigger from './triggers/processing';
