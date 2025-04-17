import { Mixin } from 'ts-mixer';
import { PostsQuery } from './query';
import { PostsCommand } from './command';

export default class PostsDS extends Mixin(PostsQuery, PostsCommand) {}
