const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        email: String
    }

    type cards
    {
        id:ID
        quotes:String
        description:String
        attitude:String
        points:String
        jobs:String
        activities:String
        image:String
    }

    type Query {
        users: [User]
        showCards:[cards]
        login(email: String!, password: String!): User
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): [User]
        addCard(quotes:String,description:String,attitude:String,points:String,jobs:String,activities:String,image:String):[cards]
        updateCard(id:Int,quotes:String,description:String,attitude:String,points:String,jobs:String,activities:String,image:String):String
        deleteCard(id:Int):String
    }
`);

module.exports=schema;