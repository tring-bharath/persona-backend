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
        quote:String
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
        login(email: String!, password: String!): String
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): [User]
        addCard(quote:String,description:String,attitude:String,points:String,jobs:String,activities:String,image:String):[cards]
        updateCard(id:Int,quote:String,description:String,attitude:String,points:String,jobs:String,activities:String,image:String):[cards]
        deleteCard(id:Int):[cards]
    }
`);

module.exports=schema;