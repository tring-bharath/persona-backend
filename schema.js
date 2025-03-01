const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        email: String
    }

    type Query {
        users: [User]
        login(email: String!, password: String!): [User]
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
    }
`);

module.exports=schema;