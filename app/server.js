const express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors'),
    cors = require('cors');

const Number = require('./schema');

require('./config');

// Creacion de ser
const app = express();

// intercambio de recursos de origen cruzado o CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded(app));

mongoose.connect(process.env.AddressDB, err => {
    if (err) {
        console.log(`${colors.red('ERROR')}: Data Base ${colors.red('DISCONNECTED')}`);
    } else {
        console.log(`Data Base ${colors.green('CONNECTED')}`);
    }
});

app.get('/', (req, res) => {
    Number.find((err, numbers) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        res.json({
            numbers
        });
    });
});
app.post('/', (req, res) => {
    let number = new Number({
        num: req.body.num
    });
    number.save((err, numberG) => {
        if (err) {
            return res.status(500).json({
                ok: false
            });
        }
        res.json({
            ok: true,
            numberG
        });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server ${colors.green('ON')} port: ${colors.green(process.env.PORT)}`);
});