import { Mixin } from 'ts-mixer';
import { PostsCommands } from './commands';
import { PostsQuery } from './query';

export default class PostsDataSource extends Mixin(PostsQuery, PostsCommands) {}
