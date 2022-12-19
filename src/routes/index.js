const routes = require('express').Router()

routes.use('/roles', require('./role.route'))
routes.use('/users', require('./user.route'))
routes.use('/posts', require('./post.route'))
routes.use('/routes', require('./route.route'))

module.exports = routes