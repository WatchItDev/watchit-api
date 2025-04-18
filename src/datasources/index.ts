import Users from './users';
import { FirestoreStore } from "./types";

export const DataSources = (store: FirestoreStore) => ({
    Users: new Users(store),
});

export type DataSourcesType = ReturnType<typeof DataSources>;