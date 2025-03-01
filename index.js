const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const pool=require("./pool");
const schema=require("./schema");
const rootValue=require("./rootValue")
const app = express();

const cors = require("cors");
app.use(cors()); 

app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true,
    })
);

app.listen(1000);
