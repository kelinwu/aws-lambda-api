const db = require('../database/rds');

module.exports.deleteTodo = (event, context, callback) => {
    const todo_id = event.pathParameters.id;

    db.todo.destroy({where: {id: todo_id }})
        .then(num_deleted => {
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    num_deleted: num_deleted
                })
            })
        })
        .catch(error => {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    error: `there was an error deleting your todo with id: ${todo_id}.`
                })
            })
        })
}