const Sequelize = require('sequelize');

//elephantsql endpoint
const sequelize = new Sequelize(
    "postgres://yakfprtn:fOkbmQdruVuXagvUxWuG23bsIJH9rPc8@elmer.db.elephantsql.com:5432/yakfprtn");

// aws RDS endpoint
// const sequelize = new Sequelize(
//     'postgres://tododbo:tododbopass@todo-db.c4p4bsw9bfzp.us-east-1.rds.amazonaws.com/todo_db');

const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
	Sequelize,
	sequelize,
	todo
}

db.sequelize.sync(/*{force: true}*/);

module.exports = db;