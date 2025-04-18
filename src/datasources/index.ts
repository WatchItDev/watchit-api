import Users from './users';

// TODO create a type for firestore store: Firestore
export const DataSources = (store) => ({
    Users: new Users(store),
});
