import { Mixin } from 'ts-mixer';
import { CommentsQuery } from './query';
import { CommentsCommand } from './command';

export default class CommentsDS extends Mixin(CommentsQuery, CommentsCommand) {}
