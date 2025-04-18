import * as externals from '@/externals'
import { DataSources}  from '@/datasources'

// TODO type a callback
export const enhanceFunction = (parent) => {

    const fireStore = externals.FireStore();
    const ds = DataSources(fireStore);

    return async (...params: any) => {
        return await parent(
            { ds, ...externals },
            ...params
        )
    }
}