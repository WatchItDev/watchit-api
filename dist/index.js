import "dotenv/config";
import { GraphQLError } from "graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  createApollo4QueryValidationPlugin,
  constraintDirectiveTypeDefsGql
} from "graphql-constraint-directive/apollo4";
import { typeDefs } from "@/schema/typeDefs.generated";
import { resolvers } from "@/schema/resolvers.generated";
import { Services } from "./services";
import { FireStore } from "./externals";
import { DataSources } from "./datasources";
import * as externals from "./externals";
const server = new ApolloServer({
  resolvers,
  typeDefs: [constraintDirectiveTypeDefsGql, typeDefs],
  plugins: [createApollo4QueryValidationPlugin()]
});
const startServer = async () => {
  const fireStore = FireStore();
  const dataSources = DataSources(fireStore);
  const services = Services({ ds: dataSources, ext: externals });
  return await startStandaloneServer(server, {
    context: async ({ req }) => {
      try {
        const address = req.headers.authorization;
        return {
          services,
          dataSources,
          reqUser: {
            address
          }
          // ...jwtDecoded
        };
      } catch (err) {
        console.error(`Error attempting to access ${err}`);
        throw new GraphQLError("Authentication token is invalid");
      }
    }
  });
};
const { url } = await startServer();
console.log(`\u{1F680} Server ready at ${url}`);
//# sourceMappingURL=index.js.map