const express = require('express')
const app = express()
const morgan = require('morgan')
const connectDB = require('./config/db')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//? config
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})

//? database
connectDB()

//? engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//* Routes
app.use('/admin', require('./routes/admin'))
app.use('/', require('./routes/home'))
app.use((req, res) => {
  res.status(404).render('404')})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} mode & port ${process.env.PORT}`)
})
