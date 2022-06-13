const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();
const port = 3000;
const fileName = 'data.txt';

app.use(bodyParser.json());

app.route('/').get((req, res) => {
    res.end('Reached endpoint');
})
app.route('/article')
.post((req, res) => {
    fs.writeFile(fileName, JSON.stringify(req.body), (err) => {
        if(err) console.log(err);
        else res.send('CREATED');
    });
}).get((req, res) => {
    fs.readFile(fileName, (err, data) => {
        if(err) {
            console.log(err);
            res.sendStatus(404);
        }
        else res.json(JSON.parse(data.toString()));
    });
}).put((req, res) => {
    if(fs.existsSync(fileName)) {
        fs.writeFile(fileName, JSON.stringify(req.body), (err) => {
            if(err) console.log(err);
            else res.send('UPDATED');
        });
    }
    else res.sendStatus(404);
}).delete((req, res) => {
    fs.unlink(fileName, (err) => {
        if(err) {
            console.log(err);
            res.sendStatus(404);
        }
        else res.send('DELETED');
    })
});

app.listen(port, () => { 
    console.log('Server has started');
});