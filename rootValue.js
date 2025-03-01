const bcrypt = require("bcryptjs");
const pool=require("./pool");

const rootValue = {
    users: async () => {
        const result = await pool.query("SELECT id, username, email FROM userdetails");
        console.log(result);

        return result.rows;
    },
    register: async ({ username, email, password }) => {
        const result = await pool.query("SELECT id, username, email FROM userdetails");
        // const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await pool.query(
                "INSERT INTO userdetails (username, email, password) VALUES ($1, $2, $3)",
                [username, email, password]
            );
            return result.rows;
            return ;
        } catch (err) {
            return "Error: " + err.message;
        }
    },
    login: async ({ email, password }) => {
        const res = await pool.query("SELECT id, username, email FROM userdetails");
        try {
            console.log("Login attempt:", email); // Debugging

            const result = await pool.query("SELECT * FROM userdetails WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                console.log("User not found");
                return result.rows;
            }

            const user = result.rows[0];
            console.log("User found:", user); // Debugging

            // const isMatch = await bcrypt.compare(password, user.password);
            const isMatch=await (password==user.password)
            console.log("Password match:", isMatch); // Debugging

            if (!isMatch) {
                return result.rows;
            }

            return result.rows;
        } catch (err) {
            console.error("Login error:", err);
            return res.rows;
        }
    }

};

module.exports=rootValue;