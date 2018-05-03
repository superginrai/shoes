const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static('server/public'));

const shoes = [{ name: 'Red Wing', cost: 250 }, { name: 'Puma Soliel v2', cost: 40 }, { name: 'Space Boots', cost: 10 }]

app.get('/shoe', (req, res) => {
    console.log('GET: /shoe)');
    res.send(shoes);

});

app.post('/shoe', (req, res) => {
    console.log('POST: new Shoe');
    const newShoe = req.body
    shoes.push(newShoe)
    res.send(shoes)
});

app.listen(PORT, () => {
    console.log('listenting on port', PORT);
});