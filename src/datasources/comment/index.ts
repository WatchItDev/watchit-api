import { Mixin } from 'ts-mixer';
import { CommentsCommands } from './commands';
import { CommentsQuery } from './query';

export default class CommentDataSource extends Mixin(CommentsQuery, CommentsCommands) {}
