import { Mixin }           from 'ts-mixer';
import { GamesQuery }     from './query';
import { GamesCommands }  from './commands';

export default class GamesDS extends Mixin(GamesQuery, GamesCommands) {}
