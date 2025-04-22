import Users from './users';
import { FireStore } from "./types";

export const DataSources = (store: FireStore) => ({
    Users: new Users(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;