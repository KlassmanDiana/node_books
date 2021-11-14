const express = require('express');
const bodyParser = require("body-parser");

// middleware
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

// отдельные роуты
const indexRouter = require('./routes/index');
const authRouter = require('./routes/api/auth');
const booksRouterAPI = require('./routes/api/books');
const booksRouter = require('./routes/books');

// зкемпляр приложения
const app = express();

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

// прослушивание порта
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});