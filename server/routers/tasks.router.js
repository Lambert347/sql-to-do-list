const express = require('express');
const router = express.Router();
//make sure the router connects to the pool.js file which connects to the database
const pool = require ('../modules/pool');

//function to get the information from the database at request of the client.
//The information is ordered by id to make sure the display id consistent. 
router.get('/', (req, res) => {
    //queries the pool and then sends back the rows from the table to the client.
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    //Sends back error if error occurs.
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});

//function to post new data from the client to the database
router.post('/', (req, res) => {
    //declares newTask variable with its value set to the request body sent from the client
    let newTask = req.body;
    console.log('Adding new task to the server', newTask);
    //query to the database to insert that newTask into the database with the outlined parameters 
    let queryText = `INSERT INTO "tasks" ("name", "description")
                    VALUES ($1, $2);`;
    //sends status back to the client confirming creation of newTask into the database
    pool.query(queryText, [newTask.name, newTask.description])
        .then(result => {
            res.sendStatus(201);
        })
        //sends back error if one occurs
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

//function to edit the existing task in the database to change the isComplete to true at the request of the client.
router.put('/isComplete/:id', (req, res) => {
    //takes in the request from the client 
    let taskId = req.params.id;
    let boolean = req.body.boolean;
    let sqlText = '';
    //if the boolean value coming in from the user is true, change the isComplete in the table to true for the item at the indicated id.
    if (boolean === 'true') {
        sqlText = `UPDATE "tasks" SET "isComplete"=true WHERE "id"=$1;`;
    }
    //if not, send error back and return, breaking the function to prevent it from continuing. 
    else {
        res.sendStatus(500);
        return;
    }
    //go into the database, make the change at the id, then send back the ok to the client
    pool.query(sqlText, [taskId]).then((resDB) => {
        res.sendStatus(200);
    })
    //send back error if one occurs 
    .catch((error) => {
        console.log('Error with put request', error);
        res.sendStatus(500);    
    })
})
//function to delete task at specific id
router.delete('/:id', (req, res) => {
    //sets the id to be deleted to the id indicated in the request by the client
    let reqId = req.params.id;
    console.log('Delete request for task id:', reqId);
    //Query to delete item from the table in the database
    let sqlText = 'DELETE FROM "tasks" WHERE "id"=$1;';
    //go into the table and delete the item, send back ok to the client
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task deleted');
            res.sendStatus(200);
        })
        //send back error if one occurs with the request.
        .catch((error) => {
            console.log(`Error with making database delete query ${sqlText}`, error);
            res.sendStatus(500);
        })
})
//export this router to the server for its use.
module.exports = router;