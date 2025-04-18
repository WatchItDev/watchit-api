import Users from './users';

export const DataSources = (store) => ({
    Users: new Users(store),
});
