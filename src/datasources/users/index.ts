import { Mixin } from 'ts-mixer';
import { UsersQuery } from './query';
import { UsersCommand } from './command';

export default class UsersDS extends Mixin(UsersQuery, UsersCommand) {}
