import { Mixin } from 'ts-mixer';
import { TipsCommands } from './commands';
import { TipsQuery } from './query';

export default class SocialDS extends Mixin(TipsQuery, TipsCommands) {}
