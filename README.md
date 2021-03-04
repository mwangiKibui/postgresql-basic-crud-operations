## Step by step guide to a simple resful api using postgres sql.

### Setting up the project.

In your desired folder, run the following:

```bash
npm init
```

Answer the relevant questions, and then follow through to the next step.

### Install the necessary dependencies

```bash
npm i cors ejs express pg
```

```bash
npm i --save-dev nodemon
```

### Setting up the application 

In the `src` folder, create an `index.js` file, and configure the application as follows:

```javascript
const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({
    extended:true
}));

app.set("view engine","ejs");

app.set("views","src/views/pages");

app.use('/static',express.static(`${__dirname}/public`));


const PORT = process.env.PORT  || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`);
});

```

### Setting up the database

In the `src` folder, create a `config` folder and then a `db.js` file. We will configure the database in the `db.js` file as follows:

```javascript
const Pool = require("pg").Pool;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'name_of_your_database',
    password:'your_password',
    port:'5432' //default port
});

module.exports = pool;
```

### Setting up the routes

Create a `routes` folder, in it create a `todos.js` file. Here we will configure our routes as follows:

```javascript
const express = require("express");

const router = express.Router();

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
```

For the routes to work, we need to configure them in the `index.js` file. To do this, we add the following changes to the `src/index.js` file:

```javascript

//import the routes
const todoRoutes = require('./routes/todos');

//configure the app.
app.use(todoRoutes);

```

### Setting up the controllers

The controllers are responsible for handling the functionality exposed by the routes. To set the controllers, create a folder `controllers`, and in it create a file `Todo.js`. In this file, we will add all our needed functionalities as follows:

```javascript
const db = require('../config/db');

class Todo {

    //get all todos.
    async getTodos(){

        let results = await db.query(
            `SELECT * FROM todos`
        ).catch(console.log);

        return results.rows;
    };

    //create a todo.
    async createTodo(todo){

        await db.query('INSERT INTO todos (title, checked) VALUES ($1, $2)',[todo.title,false])
        .catch(console.log);

        return;        
    };

    //update a todo.
    async updateTodo(todoId){

        //get the previous todo.
        let original_todo = await db.query(
            `SELECT * FROM todos WHERE id=$1`,[parseInt(todoId)]
        ).catch(console.log);

        //update
        await db.query(`UPDATE todos SET checked=$1 WHERE id=$2`,[!original_todo.rows[0].checked,parseInt(todoId)])
        .catch(console.log);

        return;
    };

    //delete a todo.
    async deleteTodo(todoId){
        
        //delete todo
        await db.query(`DELETE FROM todos WHERE id=$1`,[parseInt(todoId)])
        .catch(console.log);

        return;        
    };

};

module.exports = Todo;
```

### Linking the controllers to the routes

For the routes to really function, we need to link them with their respective controllers. In the `todos.js` file in `routes` folder, add the following changes:

```javascript

//import the controller
const Todo = require('../controllers/Todo');

//Get all todos.
router.get('/', async (req,res) => {

    let todos = await new Todo().getTodos();

});


//Create a todo.
router.post('/todo', async (req,res) => {

    let {title} = req.body;

    await new Todo().createTodo({title},res);

});

//Update a todo.
router.put('/todos/:todoId', async (req,res) => {

    let {todoId} = req.params;

    await new Todo().updateTodo(todoId,res);

    let todos = await new Todo().getTodos();

});

//Delete a todo.
router.delete('/todos/:todoId', async (req,res) => {

    let {todoId} = req.params;

    await new Todo().deleteTodo(todoId);

    let todos = await new Todo().getTodos();
    
});

```

### Setting up the views

In the `src` folder, create `views` and a `public` folder.

Copy the contents of the `src/public` folder from the final project repository and paste it in your project.

Copy also the contents of the `src/views` folder from the final project repository and paste it in your project.

### Linking the views to the routes

To be able to view all our functionalities, we need to link the routes to the views. To do this, do the following changes to the `todos.js` file in the `routes` folder.

```javascript
//Get all todos.
router.get('/', async (req,res) => {

    let todos = await new Todo().getTodos();

    return res.render('home',{
        todos
    });

});


//Create a todo.
router.post('/todo', async (req,res) => {

    let {title} = req.body;

    await new Todo().createTodo({title},res);

    return res.redirect('/')

});

//Update a todo.
router.put('/todos/:todoId', async (req,res) => {

    let {todoId} = req.params;

    await new Todo().updateTodo(todoId,res);

    let todos = await new Todo().getTodos();

    return res.render('home',{
        todos
    });

});

//Delete a todo.
router.delete('/todos/:todoId', async (req,res) => {

    let {todoId} = req.params;

    await new Todo().deleteTodo(todoId);

    let todos = await new Todo().getTodos();

    return res.render('home',{
        todos
    });
    
});
```

### Running the application
To run the application: 

- Add the following to the `scripts` object in `package.json`:

```javascript
"dev": "nodemon ./src/index.js"
```

- Start the development server by:

```bash
npm run dev
```

- In a browser, visit `http://localhost/4000`;

- Interact with the application.