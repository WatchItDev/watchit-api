import { Mixin } from 'ts-mixer';
import { SocialCommands } from './commands';
import { SocialQueries } from './query';

/**
 * Combine query + commands in a single DataSource
 */
export default class SocialDataSource extends Mixin(SocialCommands, SocialQueries) {}
export type SocialDsType = InstanceType<typeof SocialDataSource>;
