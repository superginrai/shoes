const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pg = require('pg');
const PORT = process.env.PORT || 5000;

const Pool = pg.Pool;

const pool = new Pool({
    database: 'shoe_store',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error)
});

app.use(bodyParser.json());

app.use(express.static('server/public'));

const shoes = [{ name: 'Red Wing', cost: 250 }, { name: 'Puma Soliel v2', cost: 40 }, { name: 'Space Boots', cost: 10 }]

app.get('/shoe', (req, res) => {
    console.log('GET: /shoe)');
    //const allShoes = res.data
    pool.query(`SELECT * FROM "shoes";`)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('SQL GET error', error);
            res.sendStatus(500);
        });
});

app.post('/shoe', (req, res) => {
    const shoe = req.body;
    pool.query(`INSERT INTO "shoes" ("name", "cost")
    VALUES ($1, $2);`, [shoe.name, shoe.cost])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('SQL POST error:', error);
            res.sendStatus(500);
        });
});

app.delete('/shoe', (req, res) => {
    console.log(req.query.id);
    const shoe = req.query.id;
    pool.query(`DELETE FROM "shoes"
    WHERE "id" = ${shoe};`)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('DELETE shoe error', error);
        res.sendStatus(500);
    })
})

app.put('/shoe', (req, res) => {
    const shoe = req.body
    pool.query(`UPDATE "shoes" SET "name" = ($1), "cost" = ($2) WHERE "id" = ($3)`, [shoe.name, shoe.cost, shoe.id])
    .then(() => {
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('DELETE shoe error', error);
        res.sendStatus(500);
    })
})


app.listen(PORT, () => {
    console.log('listenting on port', PORT);
});