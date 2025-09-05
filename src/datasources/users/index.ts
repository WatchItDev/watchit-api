import { Mixin } from 'ts-mixer';
import { UsersQuery } from './query';
import { UsersCommands } from './commands';

/**
 * Combine query + commands in a single DataSource
 */
export default class UsersDS extends Mixin(UsersQuery, UsersCommands) {}
export type UsersDSType = InstanceType<typeof UsersDS>;
