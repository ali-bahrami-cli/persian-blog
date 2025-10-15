const {Router} = require('express')
const router = new Router()

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
