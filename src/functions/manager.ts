import 'reflect-metadata';
import * as externals from '../externals';
import { DataSources } from '../datasources';
import type { FireStore } from '../datasources/types';
import { ServiceParams } from "../services/manager";

export function enhanceFunction<
    Args extends any[],
    Result extends object
>(fn: (ctx: ServiceParams, ...args: Args) => Promise<Result>) {
    return async (...params: Args): Promise<Result> => {
        const store: FireStore = externals.FireStore();
        const ds = DataSources(store);
        return fn({ ds, ext: externals }, ...params);
    };
}

export function enhanceTrigger<
    E extends any,
    R = void
>(handler: (ctx: ServiceParams, event: E) => Promise<R> | R) {
    return async (event: E): Promise<R> => {
        const store: FireStore = externals.FireStore()
        const ds = DataSources(store)
        return handler({ ds, ext: externals }, event)
    }
}
