import { Mixin } from 'ts-mixer';
import { UsersCommands } from './commands';
import { UsersQuery } from './query';

/**
 * Combine query + commands in a single DataSource
 */
export default class UsersDs extends Mixin(UsersQuery, UsersCommands) {}
export type UsersDsType = InstanceType<typeof UsersDs>;
