import { Mixin } from 'ts-mixer';
import { BookmarksCommands } from './commands';
import { BookmarksQuery } from './query';

export default class SocialDS extends Mixin(BookmarksQuery, BookmarksCommands) {}
