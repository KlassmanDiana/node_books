const express = require('express');
const redis =  require('redis');
const bodyParser = require("body-parser");

// зкемпляр приложения
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const REDIS_URL = process.env.REDIS_URL || 'localhost';

const client = redis.createClient(`redis://${REDIS_URL}`);

// увеличить счётчик 
app.post('/counter/:bookId/incr', (req, res) => {
    const {bookId} = req.params;

    client.incr(bookId, (err, cnt) => {
        if(err) {
            res.status(500);
            res.json("Redis error!");
        } else {
            console.log(`Hello from counter microservice ${bookId}, cnt is ${cnt} \n`);
            res.status(200);
            res.json({cnt});
        }
    })

    client.on("error", function (err) {
        console.log("Error " + err);
    });
});

// получить значение счётчика
app.get('/counter/:bookId', (req, res) => {
    const {bookId} = req.params;

    client.get(bookId, (err, cnt) => {
        if (err) {
            res.status(500);
            res.json("Redis error!");
        } else {
            res.status(200);
            res.json({cnt});
        }
    })

    client.on("error", function (err) {
        console.log("Error " + err);
    });
});

// прослушивание порта
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server counter is running on port ${PORT}`);
});
