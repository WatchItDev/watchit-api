import { Mixin } from 'ts-mixer';
import { UsersQuery } from './query';

export default class UsersDS extends Mixin(UsersQuery) {}
