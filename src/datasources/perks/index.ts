import { Mixin } from 'ts-mixer';
import { PerksQuery } from './query';
import { PerksCommands } from './commands';

export default class PerksDS extends Mixin(PerksQuery, PerksCommands) {}
export type PerksDSType = InstanceType<typeof PerksDS>;
