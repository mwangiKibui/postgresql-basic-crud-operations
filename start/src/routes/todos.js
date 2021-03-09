const express = require("express");

const router = express.Router();

const Todo = require('../controllers/Todo');

//Get all todos.
router.get('/', async (req,res) => {

   

});


//Create a todo.
router.post('/todo', async (req,res) => {

    

});

//Update a todo.
router.put('/todos/:todoId', async (req,res) => {


});

//Delete a todo.
router.delete('/todos/:todoId', async (req,res) => {

    
    
});

module.exports = router;