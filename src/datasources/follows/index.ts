import { Mixin } from 'ts-mixer';
import { FollowsQuery } from './query';
import { FollowsCommands } from './commands';

export default class SocialDS extends Mixin(FollowsQuery, FollowsCommands) {}
