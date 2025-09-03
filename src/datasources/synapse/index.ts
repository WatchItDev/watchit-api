import { Mixin } from "ts-mixer";
import { SynapseQuery } from "./query";
import { SynapseCommands } from "./commands";

export default class SynapseDS extends Mixin(SynapseQuery, SynapseCommands) {}
