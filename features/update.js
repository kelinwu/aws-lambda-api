const db = require('../database/rds');

module.exports.updateTodo = (event, context, callback) => {
    const todo_id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    //update sequlize method
    db.todo
        .update(body, {
            where: { id: todo_id },
            returning: true
        })
        .then(resArr => {
            const [rowsAffected, todoArr] = resArr;
            console.log(`${rowsAffected} row(s) were updated with this obj: ${JSON.stringify(body)};`)
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    todo: todoArr[0]
                })
            })
        })
        .catch(error=>{
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    error: `there was an error update todo id is ${todo_id}`
                })
            })
        })
}