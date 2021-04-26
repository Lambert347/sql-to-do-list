//Make sure pg is used for this module
const pg = require('pg');
//configs the pool to the correct database 
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000,
}
//sets a new pool to the Pool class with the above config
const pool = new pg.Pool(config);

//Console logs to the server that postgres is connected
pool.on("connect", () => {
    console.log("connected to postgres");
})
//alerts the server if the connection is unable to occur
pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});
//exports this module to the router for its use
module.exports = pool;