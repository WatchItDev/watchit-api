import { Mixin } from 'ts-mixer';
import { PostCommands } from './commands';
import { PostQueries } from './query';

export default class PostDataSource extends Mixin(PostQueries, PostCommands) { }
