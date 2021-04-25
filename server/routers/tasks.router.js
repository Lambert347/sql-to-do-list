const express = require('express');
const router = express.Router();
const pool = require ('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";',;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
    });
});
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding new task to the server', newTask);
    let queryText = `INSERT INTO "tasks" ("name", "description")
                    VALUES ($1, $2);`;
    pool.query(queryTExt, [newTask.name, newTask.description])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

router.put('/isComplete/:id', (req, res) => {
    let taskId = req.params.id;
    let boolean = req.body.boolean;
    let sqlText = '';
    if (boolean === 'true') {
        sqlText = `UPDATE "tasks" SET "isComplete"=true WHERE "id"=$1;`;
    }
    else {
        res.sendStatus(500);
        return;
    }
    pool.query(sqlText, [taskId]).then((resDB) => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('Error with put request', error);
        res.sendStatus(500);    
    })
})

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for task id:', reqId);
    let sqlText = 'DELETE FROM "tasks" WHERE "id"=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error with making database delete query ${sqlText}`, error);
            res.sendStatus(500);
        })
})
