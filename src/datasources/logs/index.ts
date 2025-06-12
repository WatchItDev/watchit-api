import { Mixin }      from 'ts-mixer';
import { LogsCommands } from './commands';
import { LogsQuery }    from './query';

export default class LogsDS extends Mixin(LogsCommands, LogsQuery) {}
