import { Mixin } from 'ts-mixer';
import { UserCommands } from './commands';
import { UserQueries } from './query';

/**
 * Combine query + commands in a single DataSource
 */
export default class UserDataSource extends Mixin(UserQueries, UserCommands) {}
export type UsersDsType = InstanceType<typeof UserDataSource>;
