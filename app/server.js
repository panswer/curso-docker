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

mongoose.connect(process.env.AddressDB, err => {
    if (err) {
        console.log(`${colors.red('ERROR')}: Data Base ${colors.red('DISCONNECTED')}`);
    } else {
        console.log(`Data Base ${colors.green('CONNECTED')}`);
    }
});

app.get('/', (req, res) => {
    mongoose.connect.on('error', err => {
        if (err) {
            console.log(`DataBase: ${colors.red('DISCONNECTED')}`);
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Data Base DISCONNECTED'
                }
            });
        } else {
            console.log(`DataBase: ${colors.green('CONNECTED')}`);
        }
    });
    Number.find((err, numbers) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (numbers.length === 0) {
            console.log(numbers);
            let number = new Number({
                num: 1
            });
            number.save((err, numberS) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    number: numberS.num
                });
            });
        } else {
            let number = numbers[0];
            number.num++;
            Number.findByIdAndUpdate(number._id, number, (err, numberU) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    number: numberU.num
                });
            });
        }
    });
});

mongoose.disconnect().then().catch()

app.listen(process.env.PORT, () => {
    console.log(`Server ${colors.green('ON')} port: ${colors.green(process.env.PORT)}`);
});