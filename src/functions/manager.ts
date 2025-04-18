import * as externals from '../externals';
import { DataSources, DataSourcesType } from '../datasources';
import type { FirestoreStore } from '../datasources/types';

export type FunctionContext = {
    ds: DataSourcesType;
    ext: typeof externals;
};

export function enhanceFunction<
    Args extends any[],
    Result extends object
>(fn: (ctx: FunctionContext, ...args: Args) => Promise<Result>) {
    return async (...params: Args): Promise<Result> => {
        const store: FirestoreStore = externals.FireStore();
        const ds = DataSources(store);
        return fn({ ds, ext: externals }, ...params);
    };
}
