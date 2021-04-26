//Make sure that express and the body-parser is used for data from the client.
const express = require('express');
const bodyParser = require('body-parser');
//make sure that the router file and its functions are used
const tasksRouter = require('./routers/tasks.router.js');

//sets new app variable to express
const app = express();
//tells app to use the bodyParser and the router
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', tasksRouter);
//tells app to use the files in server and public folders
app.use(express.static('server/public'));

//creates port at 5000 and tells server to use that port
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})