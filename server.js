const express = require('express')
const app = express()
const morgan = require('morgan')
const connectDB = require('./config/db')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//? config
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
app.use(express.urlencoded({extended: false}))
require('./config/passport')

//* session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

//* passport middleware
app.use(passport.initialize())
app.use(passport.session())

//* flash
app.use(flash())

//? database
connectDB()

//? engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//* Routes
app.use('/admin', require('./routes/admin'))
app.use('/', require('./routes/users'))
app.use((req, res) => {
  res.status(404).render('404',{headTitle : 'صفحه پیدا نشد'})})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} mode & port ${process.env.PORT}`)
})
