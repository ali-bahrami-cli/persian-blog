const {Router} = require('express')
const router = new Router()
const {getLoginUser,getRegisterUser} = require('../controllers/userController')
const {handleRegisterUser,handleLoginUser} = require('../controllers/userController')
const {isAuthenticated} = require("../middlewares/authenticator");


//? @desc users

router.get('/', (req, res) => {
  res.render('home')
})

//* Login route
router.get('/login', getLoginUser)

//? Handle user login
router.post('/login-user', handleLoginUser)

//* Register route
router.get('/register', getRegisterUser)

//? Handle user registration
router.post('/register-user', handleRegisterUser)


//* User dashboard
router.get('/user/dashboard', isAuthenticated, (req, res) => {
  res.render('./user/user-dash', { headTitle: 'داشبورد کاربر' })
})


module.exports = router
