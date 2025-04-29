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
import { Services } from './services'
import { FireStore } from './externals';
import { DataSources } from './datasources';
import * as externals from './externals'
import { GQL } from "@/types";


// const {
//     API_WEB3_AUTH_SOCIAL_JWKS
// }: NodeJS.Process["env"] = process.env

const host = process.env.HOST || '0.0.0.0';
const port = (process.env.PORT || 4000) as number

const server = new ApolloServer<GQL.ContextType>({
    resolvers,
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    plugins: [createApollo4QueryValidationPlugin()],
})


const startServer = async () => {

    const fireStore = FireStore();
    const dataSources = DataSources(fireStore);
    const services = Services({ ds: dataSources, ext: externals })

    return await startStandaloneServer(server, {
        listen: { port, host },
        context: async ({ req }) => {
            try {
                // // idToken passed from the frontend in the Authorization header
                const address = req.headers.authorization as string;
                // const idToken = req.headers.authorization?.split(' ')[1] as string;
                // if (!idToken) throw new Error("Invalid token");

                // // TODO pending to check the address from public key
                // const jwks = jose.createRemoteJWKSet(new URL(WEB3_AUTH_SOCIAL_JWKS)); // for social logins
                // const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

                return {
                    services,
                    dataSources,
                    reqUser: {
                        address
                    }
                    // ...jwtDecoded
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

