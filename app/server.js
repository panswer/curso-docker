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

mongoose.connect(process.env.AddressDB, (err) => {
    if (err) {
        console.log(`${colors.red('ERROR')}: DB off`);
    } else {
        console.log(`DB ${colors.green('ON')}`);
    }
});

app.get('/', (req, res) => {
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

app.listen(process.env.PORT, () => {
    console.log(`Server ${colors.green('ON')} port: ${colors.green(process.env.PORT)}`);
});