const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "personausers",
    password: "1234",
    port: 5432,
});

// GraphQL Schema
const schema = buildSchema(`
    type User {
        id: ID
        username: String
        email: String
    }

    type Query {
        users: [User]
        login(email: String!, password: String!): String
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): String
    }
`);

// GraphQL Root Resolvers
const root = {
    users: async () => {
        const result = await pool.query("SELECT id, username, email FROM userdetails");
        console.log(result);

        return result.rows;
    },
    register: async ({ username, email, password }) => {
        // const result = await pool.query("SELECT id, username, email FROM userdetails");
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await pool.query(
                "INSERT INTO userdetails (username, email, password) VALUES ($1, $2, $3)",
                [username, email, hashedPassword]
            );
            // return result.rows;
            return "User registered successfully!";
        } catch (err) {
            return "Error: " + err.message;
        }
    },
    login: async ({ email, password }) => {
        try {
            console.log("Login attempt:", email); // Debugging

            const result = await pool.query("SELECT * FROM userdetails WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                console.log("User not found");
                return "User not found";
            }

            const user = result.rows[0];
            console.log("User found:", user); // Debugging

            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match:", isMatch); // Debugging

            if (!isMatch) {
                return "Invalid credentials";
            }

            return "Login successful";
        } catch (err) {
            console.error("Login error:", err);
            return "Error: " + err.message;
        }
    }

};

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);

app.listen(1000, () => console.log("Server running on port 000"));
