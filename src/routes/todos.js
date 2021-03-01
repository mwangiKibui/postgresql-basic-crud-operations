const express = require("express");

const router = express.Router();

const Todo = require('../controllers/Todo');

//Get all todos.
router.get('/todos', (req,res) => {

    return new Todo().getTodos(res);

});

//Get a specific todo.
router.get('/todos/:todoId', (req,res) => {

    let {todoId} = req.params;

    return new Todo().getTodo(todoId,res);

});

//Create a todo.
router.post('/todo', (req,res) => {

    let {title} = req.body;

    return new Todo().createTodo({title},res);

});

//Update a todo.
router.put('/todos/:todoId', (req,res) => {

    let {todoId} = req.params;

    return new Todo().updateTodo(todoId,req.body,res);
});

//Delete a todo.
router.delete('/todos/:todoId', (req,res) => {

    let {todoId} = req.params;

    return new Todo().deleteTodo(todoId,res);
    
});

module.exports = router;