import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageDisabled,
} from '@apollo/server/plugin/disabled';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import {
  constraintDirectiveTypeDefsGql,
  createApollo4QueryValidationPlugin,
} from 'graphql-constraint-directive/apollo4.js';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { webcrypto } from 'crypto';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';

import { resolvers } from '@/schema/resolvers.generated';
import { typeDefs } from '@/schema/typeDefs.generated';
import { User } from '@/schema/types';

import { DataSources } from './datasources';
import Externals from './externals';
import { Services } from './services';
import type { Disposable } from './types';

// import SentryPlugin from '@/sentry'

if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}

const buildWSServer = (httpServer: http.Server, inject: Record<string, any>): Disposable => {
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const schema = makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
    resolvers,
  });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  return useServer(
    { schema, context: (ctx, msg, args) => ({ ctx: { ...ctx, ...inject }, msg, args }) },
    wsServer,
  );
};

const startServer = async (): Promise<{ url: string; server: http.Server }> => {
  const externals = Externals();
  const dataSources = DataSources({
    fs: externals.FireStore(),
    pa: externals.Prisma(),
  });

  const services = Services({ ds: dataSources, ext: externals });
  const pubsub = new PubSub();

  const host = process.env.API_HOST || '0.0.0.0';
  const port = (process.env.API_PORT || 4000) as number;
  const app: express.Express = express();
  const httpServer: http.Server = http.createServer(app);
  const wsServer: Disposable = buildWSServer(httpServer, { pubsub });

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
              await wsServer.dispose();
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
  app.use(helmet());
  app.use(compression());
  app.use(limiter);
  app.use(express.json({ limit: '50mb' }));

  // TODO for production
  // app.use(cors({ origin: ["https://app.watchit.movie", "https://studio.apollographql.com"] }));
  app.use(cors());

  app.use(
    expressMiddleware<GQL.ContextType>(server, {
      context: async ({ req }: ExpressContextFunctionArgument): Promise<GQL.ContextType> => {
        return {
          req,
          services,
          dataSources,
          pubsub,
          externals,
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
