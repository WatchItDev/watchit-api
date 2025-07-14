import { Mixin }           from 'ts-mixer';
import { RanksQuery }     from './query';
import { RanksCommands }  from './commands';

export default class RanksDS extends Mixin(RanksQuery, RanksCommands) {}
