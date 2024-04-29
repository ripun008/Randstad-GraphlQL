import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { InMemoryLRUCache} from "@apollo/utils.keyvaluecache";

import resolvers from './resolvers.js'

const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
`;
const books = [
    {
        title: "Fellowship of the Rings",
        author: "J.R.R Tolkein"
    },
    {
        title: "The Hobbit",
        author: "J.R.R Tolkein"
    }
]

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    cache: new InMemoryLRUCache({
        ttl: 300,
        maxSize: Math.pow(2, 20) * 100,
    })
})

await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server running at port 4000")