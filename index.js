var express = require('express')
//var { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
//var { loadSchema } = require('@graphql-tools/load')
var { buildSchema } = require('graphql')
var { createHandler } = require('graphql-http/lib/use/express')
var { ruruHTML } = require('ruru/server')

// Construct a schema
var schema = buildSchema(`
    type Query {
        hello: String
        goodbye: String
    }
`)

// Provide a root for all resolvers
var root = {
    hello() {
        return "Hello World!"
    },
    goodbye() {
        return "Good bye!"
    }
}

// Run GraphQL
var app = express()
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000)
console.log("Running GraphQL on port 4000")
