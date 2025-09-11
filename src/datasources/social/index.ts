import { Mixin } from 'ts-mixer';
import { SocialCommands } from './commands';
import { SocialQuery } from './query';

/**
 * Combine query + commands in a single DataSource
 */
export default class SocialDs extends Mixin(SocialCommands, SocialQuery) {}
export type SocialDsType = InstanceType<typeof SocialDs>;
