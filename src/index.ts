import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';

import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginInlineTraceDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@apollo/server/express4';

import {
  createApollo4QueryValidationPlugin,
  constraintDirectiveTypeDefsGql,
} from 'graphql-constraint-directive/apollo4.js';

import { webcrypto } from 'crypto';
import { typeDefs } from '@/schema/typeDefs.generated';
import { resolvers } from '@/schema/resolvers.generated';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { User } from '@/schema/types';
import { GQL } from '@/types';

import Externals from './externals';
import { DataSources } from './datasources';
import { Services } from './services';

// import SentryPlugin from '@/sentry'

if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}

const startServer = async (): Promise<{ url: string; server: http.Server }> => {
  const externals = Externals();
  const dataSources = DataSources(externals.FireStore());
  const services = Services({ ds: dataSources, ext: externals });
  const pubsub = new PubSub();

  const host = process.env.API_HOST || '0.0.0.0';
  const port = (process.env.API_PORT || 4000) as number;
  const app: express.Express = express();
  const httpServer: http.Server = http.createServer(app);

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    resolvers,
  });
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => ({ ctx: { ...ctx, pubsub }, msg, args }),
    },
    wsServer,
  );

  const server = new ApolloServer<GQL.ContextType>({
    resolvers,
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    csrfPrevention: true,
    includeStacktraceInErrorResponses: false,
    introspection: true,
    plugins: [
      createApollo4QueryValidationPlugin(),
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageDisabled(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // SentryPlugin(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  console.log('Starting server..');
  await server.start();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  });

  app.disable('x-powered-by');
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(limiter);
  app.use(express.json({ limit: '50mb' }));
  app.use(
    expressMiddleware<GQL.ContextType>(server, {
      context: async ({
        req,
      }: ExpressContextFunctionArgument): Promise<GQL.ContextType> => {
        return {
          services,
          dataSources,
          pubsub,
          externals,
          req,
          user: {} as User,
        };
      },
    }),
  );

  // Wait for server to start listening
  await new Promise<void>((resolve) => {
    httpServer.listen({ host, port }, resolve);
  });

  return { url: `http://${host}:${port}/`, server: httpServer };
};

// The `listen` method launches a web server
const { url } = await startServer();
console.log(`🚀 Server ready at ${url}`);
