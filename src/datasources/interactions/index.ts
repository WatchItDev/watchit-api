import { Mixin } from 'ts-mixer';
import { InteractionsCommand } from './command';
import { InteractionsQuery } from './query';

export default class InteractionsDS extends Mixin(
    InteractionsQuery,
    InteractionsCommand
) {}
