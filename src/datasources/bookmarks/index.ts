import { Mixin } from 'ts-mixer';
import { BookmarksQuery } from './query';
import { BookmarksCommands } from './commands';

export default class SocialDS extends Mixin(
  BookmarksQuery,
  BookmarksCommands,
) {}
