import 'dotenv/config'
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { format } from 'url';

import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'

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

const startServer = async () => {

    const host = process.env.API_HOST || '0.0.0.0';
    const port = (process.env.API_PORT || 4000) as number
    const app: express.Express = express();
    const httpServer: http.Server = http.createServer(app);

    const server = new ApolloServer<GQL.ContextType>({
        resolvers,
        typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
        plugins: [
            createApollo4QueryValidationPlugin(),
            ApolloServerPluginDrainHttpServer({ httpServer: httpServer })
        ],
    })


    console.log("Starting server..")
    await server.start();

    const fireStore = FireStore();
    const dataSources = DataSources(fireStore);
    const services = Services({ ds: dataSources, ext: externals })

    app.use(
        cors(),
        helmet(),
        app.disable('x-powered-by'),
        express.json({ limit: '50mb' }),
        expressMiddleware(server, {
            context: (({ req }) => {
                return { services, dataSources, req }
            })
        }),
    )

    // Wait for server to start listening
    await new Promise<void>((resolve) => {
        httpServer.listen({ host, port }, resolve);
    });

    return format({ protocol: 'http', host, port, pathname: '/', });
}

// The `listen` method launches a web server
const url = await startServer();
console.log(`🚀 Server ready at ${url}`)

