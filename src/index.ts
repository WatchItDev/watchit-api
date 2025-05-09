import 'dotenv/config'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import {
    createApollo4QueryValidationPlugin,
    constraintDirectiveTypeDefsGql
} from 'graphql-constraint-directive/apollo4'

import { typeDefs } from '@/schema/typeDefs.generated'
import { resolvers } from '@/schema/resolvers.generated'
import { Services } from './services'
import { FireStore } from './externals';
import { DataSources } from './datasources';
import * as externals from './externals'
import buildCtx from './context'
import { GQL } from "@/types";


const host = process.env.API_HOST || '0.0.0.0';
const port = (process.env.API_PORT || 4000) as number

const server = new ApolloServer<GQL.ContextType>({
    resolvers,
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    plugins: [createApollo4QueryValidationPlugin()],
})


const startServer = async () => {

    const fireStore = FireStore();
    const dataSources = DataSources(fireStore);
    const services = Services({ ds: dataSources, ext: externals })
    const context = buildCtx({ services, dataSources });

    return await startStandaloneServer(server, {
        listen: { port, host }, context
    })
}

// The `listen` method launches a web server
const { url } = await startServer();
console.log(`🚀 Server ready at ${url}`)

