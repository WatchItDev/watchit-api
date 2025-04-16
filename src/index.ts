import { createServer } from 'http'
import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from '@/schema/typeDefs.generated'
import { resolvers } from '@/schema/resolvers.generated'

const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }) })
const server = createServer(yoga)

console.log("Listening on port 3000")
server.listen(3000)