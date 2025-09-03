import { Mixin } from "ts-mixer";
import { Web3Query } from "./query";
import { Web3Commands } from "./commands";

export default class Web3DS extends Mixin(Web3Query, Web3Commands) {}
export type Web3DSType = InstanceType<typeof Web3DS>;
