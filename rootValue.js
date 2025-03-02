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
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await pool.query(
                "INSERT INTO userdetails (username, email, password) VALUES ($1, $2, $3)",
                [username, email, hashedPassword]
            );
            return result.rows;
        } catch (err) {
            return "Error: " + err.message;
        }
    },
    login: async ({ email, password }) => {
        const res = await pool.query("SELECT id, username, email FROM userdetails");
        try {

            const result = await pool.query("SELECT * FROM userdetails WHERE email = $1", [email]);
            if (result.rows.length === 0) {
                return "UserNotFound";
            }

            const user=result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            // isMatch=(password==user.password)

            if (!isMatch) {
                return "InvalidCredentials"
            }

            return user.username;
        } catch (err) {
            console.error("Login error:", err);
            return "Login error:"+ err;
        }
    },

    addCard: async({quote,description,attitude,points,jobs,activities,image})=>
    {
        const temp=await pool.query("select * from personaDetails")
        // console.log(cards.rows)
        try{
            await pool.query("insert into personaDetails (quote,description,attitude,points,jobs,activities,image) values ($1,$2,$3,$4,$5,$6,$7)",
                [quote,description,attitude,points,jobs,activities,image]
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

    updateCard: async ({id,quote,description,attitude,points,jobs,activities,image})=>
    {
        const temp=await pool.query("select * from personaDetails");
            const tempval=temp.rows;
        try{
            
            await pool.query(
                "UPDATE personaDetails SET quote = $2, description = $3, attitude = $4, points = $5, jobs = $6, activities = $7, image = $8 WHERE id = $1",
                [id, quote, description, attitude, points, jobs, activities, image]
            );
            
            const res=await pool.query("select * from personaDetails");
            const foundUser=res.rows;
            return foundUser;
            
        }
        catch(err)
        {
            return tempval;
        }
    },

    deleteCard: async ({id}) =>
    {
        const temp=await pool.query("select * from personaDetails");
            const tempval=temp.rows;
        try{
            await pool.query("delete from personaDetails where id=$1",[id])
            const res=await pool.query("select * from personaDetails");
            const foundUser=res.rows;
            return foundUser;
        }
        catch(err)
        {
            console.log(err.message);
            return tempval;   
        }
    }

};

module.exports=rootValue;