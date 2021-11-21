 Ссылка на приложение на Heroku.
 https://klassmandiana-nodejs-express.herokuapp.com/


Работа с MongoDB
1) Create (вставка данных минимум о двух книгах в коллекцию books)
db.books.insertMany( [
    {
        title: "string",
        description: "string",
        authors: "string"
    },
    {
        title: "string",
        description: "string",
        authors: "string"
    },
    {
        title: "string",
        description: "string",
        authors: "string"
    }
   ] );

2) Find (поиск по title полю)
db.books.find( {
   title: "Алиса в стране чудес" }
} )

3) Update (редактирования полей: description и authors коллекции books по _id записи)
db.books.updateOne(
   { _id: "12345" },
   {
     $set: { description: "new description", authors: "new authors" }
   }
)

Публикация образа
https://hub.docker.com/repository/docker/dianaklassman/library