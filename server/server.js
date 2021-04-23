const express = require('express');
const bodyParser = require('body-parser');
const tasksRouter = require('./routers/tasks.router.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', tasksRouter);

app.use(express.static('server/public'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})