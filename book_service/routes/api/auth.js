const express = require('express');
const router = express.Router();
const passport = require('passport')
const db = require('../../db/index.js')

// страница Войти
router.get('/home',
    function (req, res) {
        res.render('auth/home', { user: req.user })
})

// страница авторизации
router.get('/login',
    function (req, res) {
        res.render('auth/login')
})

// авторизация
router.post('/login',
  passport.authenticate(
    'local',
    {
      failureRedirect: 'login',
    },
  ),
  function (req, res) {
    console.log("req.user: ", req.user)
    res.redirect('/')
  }
  )

  // авторизация нового пользотваеля
  router.post('/signup', (req, res) => {
    console.log("req.user: ", req.user)
    const {username, password, email, displayName} = req.body
    const newUser = {
        id: Math.floor(Math.random() * (1000 - 10 + 1)) + 10,
        username,
        password,
        displayName,
        emails: [{ value: email }],
      };
      db.users.addNewUser(newUser);
    res.redirect('/')
  })

  // страница профиля
  router.get('/profile',
  function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect('login')
    }
    next()
  },
  function (req, res) {
    res.render('auth/profile', { user: req.user })
  })

  // разлогин
  router.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  })

module.exports = router;