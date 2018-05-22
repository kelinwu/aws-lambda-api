'use strict';
const db = require('../database/rds');

module.exports.getTodo = (event, context, callback) => {
    const todo_id = event.pathParameters.id;
    db.todo.findOne({
        where: {id: todo_id}, 
        attributes: ['id','task','completed']
    })
    .then(todo => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                todo: todo,
            }),
        };
    
        callback(null, response);
    })
    .catch(error => {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                error: `there was an error fetching your todo with id: ${todo_id}.`
            })
        })
    })


};

module.exports.listTodos = (event, context, callback) => {
    db.todo.findAll({
        attributes: ['id', 'task', 'completed']
    }).then(todos => {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                todos: todos,
            }),
        };

        callback(null, response);
    })
    .catch(error => {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                error: `there was an error fetching your todos.`
            })
        })
    })

};
