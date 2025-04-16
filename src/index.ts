import 'dotenv/config'
import * as jose from "jose"
import { GraphQLError } from 'graphql';
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import {
    createApollo4QueryValidationPlugin,
    constraintDirectiveTypeDefsGql
} from 'graphql-constraint-directive/apollo4'

import { typeDefs } from '@/schema/typeDefs.generated'
import { resolvers } from '@/schema/resolvers.generated'
import { FireStore } from './externals';
import { DataSources } from './datasources';
import { Services } from './services'
import * as externals from './externals'


const {
    WEB3_AUTH_SOCIAL_JWKS
}: NodeJS.Process["env"] = process.env

const server = new ApolloServer<any>({
    resolvers,
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    plugins: [createApollo4QueryValidationPlugin()],
})


const startServer = async () => {

    const fireStore = FireStore();
    const dataSources = DataSources(fireStore);
    const services = Services({ds: dataSources, ext: externals })

    return await startStandaloneServer(server, {
        context: async ({ req }) => {
            try {
                // idToken passed from the frontend in the Authorization header
                const idToken = req.headers.authorization?.split(' ')[1] as string;
                if (!idToken) throw new Error("Invalid token");

                const jwks = jose.createRemoteJWKSet(new URL(WEB3_AUTH_SOCIAL_JWKS)); // for social logins
                const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

                return {
                    services,
                    dataSources,
                    ...jwtDecoded
                }

            } catch (err) {
                console.error(`Error attempting to access ${err}`)
                throw new GraphQLError('Authentication token is invalid')
            }
        }
    })
}

// The `listen` method launches a web server
const { url } = await startServer();
console.log(`🚀 Server ready at ${url}`)

