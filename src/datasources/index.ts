// https://www.apollographql.com/docs/apollo-server/data/fetching-data

import UsersDataSource from './users'

export const DataSources = (store) => {
    return {
        Users: new UsersDataSource(store)
    }
}