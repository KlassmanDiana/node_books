const express = require('express');
const http = require('http');
const bodyParser = require("body-parser");

// middleware
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

// отдельные роуты
const indexRouter = require('./routes/index');
const authRouter = require('./routes/api/auth');
const booksRouterAPI = require('./routes/api/books');
const booksRouter = require('./routes/books');

// сокет
const socketIO = require('socket.io');

// зкемпляр приложения
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// подключение шаблонизатора ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// логирование
app.use(loggerMiddleware);

// роутер для статики
app.use('/public', express.static(__dirname + "/public"));

// роутер для главной страницы
app.use('/', indexRouter);

// роутер для авторизации
app.use('/api/user', authRouter);

// роутер для книг API
app.use('/api/books', booksRouterAPI);

// роутер для книг
app.use('/books', booksRouter);

// ошибки
app.use(errorMiddleware);

// realtime
const rooms = {};

io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    // сообщение себе
    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg);
    });

    // сообщение для всех
    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
    });

    // работа с комнатами
    const {roomName} = socket.handshake.query;
    socket.join(roomName);
    if (roomName) {
        if (!rooms[roomName]) {
            rooms[roomName] = { roomName, messages: [] };
        } else {
            socket.emit('messages-in-room', { messages: rooms[roomName].messages });
        }
    }

    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`;
        if (roomName) {
            rooms[roomName].messages.push(msg)
        };
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

// прослушивание порта
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});