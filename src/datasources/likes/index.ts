import { Mixin } from "ts-mixer";
import { LikesQuery } from "./query";
import { LikesCommands } from "./commands";

export default class SocialDS extends Mixin(LikesQuery, LikesCommands) {}
