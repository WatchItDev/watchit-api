import { Mixin } from 'ts-mixer';
import { RelationsCommands } from './commands';
import { RelationsQuery } from './query';

export default class RelationsDataSource extends Mixin(RelationsQuery, RelationsCommands) {}
