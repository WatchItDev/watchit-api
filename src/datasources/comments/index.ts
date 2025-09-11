import { Mixin } from 'ts-mixer';
import { CommentsCommands } from './commands';
import { CommentsQuery } from './query';

export default class CommentsDS extends Mixin(CommentsQuery, CommentsCommands) {}
