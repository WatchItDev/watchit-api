import { Mixin }          from 'ts-mixer';
import { PostsQuery }     from './query';
import { PostsCommands }  from './commands';

export default class PostsDS extends Mixin(PostsQuery, PostsCommands) {}
