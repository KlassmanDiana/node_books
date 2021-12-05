const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user )
    res.render("index", {
        title: "Главная",
        user: req.user 
    });
});

router.get('/404', (req, res) => {
    res.render("error/404", {
        title: "Ошибка!!!",
        user: req.user 
    });
});

module.exports = router;