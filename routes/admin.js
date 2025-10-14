const {Router} = require('express')
const router = new Router()

router.get('/', (req, res) => {
  res.render('admin-dash')
})

router.get('/posts', (req, res) => {
  res.render('admin-posts')
})

router.get('/categories', (req, res) => {
  res.render('admin-categories')
})


module.exports = router
