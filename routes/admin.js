const {Router} = require('express')
const router = new Router()
const User = require('../models/User')


//? @desc users
//* Handle user registration
router.post('/register-user',async (req, res) => {
  try {
    await User.validateUser(req.body)
    // If validation passes, create the user
    res.redirect('/login')
  } catch (err) {
    console.log(err);
    res.render('register', {
      headTitle: 'ثبت نام',
      errors: err.errors,
      // userData: req.body
    })
  }
})

//? @desc admins

router.get('/', (req, res) => {
  res.render('./admin/admin-dash')
})

router.get('/login', (req, res) => {
  res.render('./admin/login', { headTitle: 'ورود به حساب' })
})

router.get('/posts', (req, res) => {
  res.render('./admin/admin-posts')
})

router.get('/categories', (req, res) => {
  res.render('./admin/admin-categories')
})



module.exports = router
