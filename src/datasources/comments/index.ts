import { Mixin } from "ts-mixer";
import { CommentsQuery } from "./query";
import { CommentsCommands } from "./commands";

export default class CommentsDS extends Mixin(
  CommentsQuery,
  CommentsCommands,
) {}
