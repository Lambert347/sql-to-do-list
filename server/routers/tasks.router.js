const express = require('express');
const { Console } = require('node:console');
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

