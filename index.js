const express = require('express');

// middleware
const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

// отдельные роуты
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

// зкемпляр приложения
const app = express();

app.use(express.json());

// логирование
app.use(loggerMiddleware);

// роутер для статики
app.use('/public', express.static(__dirname + "/public"));

// роутер для /
app.use('/', indexRouter);

// роутер для авторизации
app.use('/api/user', authRouter);

// роутер для книг
app.use('/api/books', booksRouter);

// ошибки
app.use(errorMiddleware);

// прослушивание порта
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});