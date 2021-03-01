const db = require('../config/db');

class Todo {

    //get all todos.
    async getTodos(res){

        let results = await db.query(
            `SELECT * FROM todos`
        ).catch(console.log);

        return res.json(results.rows);
    };

    //get a specific todo.
    async getTodo(todoId,res){

        let id = parseInt(todoId);

        let result = await db.query(`SELECT * FROM todos WHERE id=${id}`)
        .catch(console.log);

        return res.json(result.rows);
    };

    //create a todo.
    async createTodo(todo,res){

        await db.query('INSERT INTO todos (title, checked) VALUES ($1, $2)',[todo.title,false])
        .catch(console.log);

        return res.send({
            success:true,
            message:"Todo added!"
        });
        
    };

    //update a todo.
    async updateTodo(todoId,todo,res){

        let {title,checked} = todo;

        await db.query(`UPDATE todos SET title=$1,checked=$2 WHERE id=$3`,[title,checked,parseInt(todoId)])
        .catch(console.log);

        return res.send({
            success:true,
            message:"Todo updated"
        })
    };

    //delete a todo.
    async deleteTodo(todoId,res){

        await db.query(`DELETE FROM todos WHERE id=$1`,[parseInt(todoId)])
        .catch(console.log);

        return res.send({
            success:true,
            message:"Todo deleted"
        });
        
    };

};

module.exports = Todo;