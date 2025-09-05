import { Mixin } from 'ts-mixer';
import { XPCommands } from './commands';
import { XPQuery } from './query';

export default class XPDS extends Mixin(XPCommands, XPQuery) {}
export type XPDSType = InstanceType<typeof XPDS>;
