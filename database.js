const { Sequelize } = require('sequelize');

const pool = new Sequelize('student_management_system', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

pool.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Error connecting to the database:', err));

    const User = pool.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      });
      
      User.findAll().then(users => console.log(users));
module.exports=pool;