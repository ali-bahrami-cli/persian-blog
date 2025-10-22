const {Router} = require('express')
const router = new Router()


router.get('/', (req, res) => {
  res.render('home')
})

router.get('/login', (req, res) => {
  res.render('login',
     { headTitle: 'ورود' })
})

router.get('/register', (req, res) => {
  res.render('register',
   { headTitle: 'ثبت نام' , errors: [] })
})



module.exports = router
