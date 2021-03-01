const express = require("express");

const app = express();

const todoRoutes = require('./routes/todos');

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(todoRoutes);

const PORT = process.env.PORT  || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});