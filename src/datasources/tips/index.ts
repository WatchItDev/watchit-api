import { Mixin } from 'ts-mixer';
import { TipsQuery } from './query';
import { TipsCommands } from './commands';

export default class SocialDS extends Mixin(TipsQuery, TipsCommands) {}
