import { Mixin }           from 'ts-mixer';
import { SocialQuery }     from './query';
import { SocialCommands }  from './commands';

export default class SocialDS extends Mixin(SocialQuery, SocialCommands) {}
