import { Mixin } from 'ts-mixer';
import { EdgeCommands } from './commands';
import { EdgeQueries } from './query';

export default class EdgeDataSource extends Mixin(EdgeQueries, EdgeCommands) {}
