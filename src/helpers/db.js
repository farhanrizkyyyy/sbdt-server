const { PrismaClient } = require('@prisma/client')
const { withExclude } = require('prisma-exclude')
const argon2 = require('argon2')

const db = withExclude(new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'stdout',
      level: 'error'
    },
    {
      emit: 'stdout',
      level: 'info'
    },
    {
      emit: 'stdout',
      level: 'warn'
    }
  ]
}))

db.$use(async (params, next) => {
  if (params.model === 'User' && (params.action === 'create' || params.action == 'update') && params.args.data.password !== undefined) {
    params.args.data.password = await argon2.hash(params.args.data.password)
  }
  return next(params)
})

// db.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

db.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'findFirst') {
    const password = params.args.where?.password
    if (password) {
      delete params.args.where.password
    }
    const user = await next(params)
    if (password) {
      try {
        if (user && await argon2.verify(user.password, password)) {
          // delete user.password
          return user
        }
      } catch (e) {
        return null
      }
      return null
    } else {
      return user
    }
  }
  return next(params)
})

db.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted: true }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted = true
      } else {
        params.args.data = { deleted: true }
      }
    }
  }
  return next(params)
})

module.exports = db