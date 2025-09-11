import { Mixin } from 'ts-mixer';
import { FollowsCommands } from './commands';
import { FollowsQuery } from './query';

export default class SocialDS extends Mixin(FollowsQuery, FollowsCommands) {}
