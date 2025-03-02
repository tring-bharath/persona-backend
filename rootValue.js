const bcrypt = require("bcryptjs");
const pool=require("./pool");

const rootValue = {
    users: async () => {
        const result = await pool.query("SELECT id, username, email FROM userdetails");
        console.log(result);

        return result.rows;
    },

    showCards:async ()=>
    {
        const result = await pool.query("SELECT * FROM personaDetails");
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
                return result.rows[0];
            }

            const user = result.rows[0];
            console.log("User found:", user); // Debugging

            // const isMatch = await bcrypt.compare(password, user.password);
            const isMatch=await (password==user.password)
            console.log("Password match:", isMatch); // Debugging

            if (!isMatch) {
                return result.rows[0];
            }

            return result.rows[0];
        } catch (err) {
            console.error("Login error:", err);
            return res.rows[0];
        }
    },

    addCard: async({quotes,description,attitude,points,jobs,activities,image})=>
    {
        const temp=await pool.query("select * from personaDetails")
        // console.log(cards.rows)
        try{
            await pool.query("insert into personaDetails (quotes,description,attitude,points,jobs,activities,image) values ($1,$2,$3,$4,$5,$6,$7)",
                [quotes,description,attitude,points,jobs,activities,image]
            );
            const cards=await pool.query("select * from personaDetails")
            return cards.rows;
        }
        catch(err)
        {
            console.log(err.message);
            return temp.rows;
        }
    },

    updateCard: async ({id,quotes,description,attitude,points,jobs,activities,image})=>
    {
        try{
            const res=await pool.query("select * from personaDetails where id=$1",[id]);
            const foundUser=res.rows[0];
            
        }
        catch(err)
        {
            return "error"
        }
    },

    deleteCard: async ({id}) =>
    {
        try{
            await pool.query("delete from personaDetails where id=$1",[id])
            return "deleted";
        }
        catch(err)
        {
            console.log(err.message);
            return "error";   
        }
    }

};

module.exports=rootValue;