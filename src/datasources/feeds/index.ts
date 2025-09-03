import { Mixin } from "ts-mixer";
import { FeedsQuery } from "./query";
import { FeedsCommands } from "./commands";

export default class FeedsDS extends Mixin(FeedsQuery, FeedsCommands) {}
