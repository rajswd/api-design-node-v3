import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import router from './resources/item/item.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
/**
 * Adding middleware in multiple ways
 */
const executeBeforeEveryCall = (req, res, next) => {
  console.log('---------executeBeforeEveryCall---------')
  // WE can also pass data to next handler ex
  req.addOnData = {
    middlewareRequest: ' --- executeBeforeEveryCall middleware Data ----'
  }
  res.addOnData = { middlewareResponse: ' --- executeBeforeEveryCall ----' }
  next()
}

const log = (req, res, next) => {
  console.log('----LOG--1----')
  next()
}

const log2 = (req, res, next) => {
  console.log('----LOG--2----')
  next()
}
// Adding middle ware which will execute before every api call.
app.use(executeBeforeEveryCall)

app.get('/', [log, log2], (req, res) => {
  res.send(
    Object.assign(
      {},
      {
        msg: '------HELLO EXPRESS-----',
        middlewareDataReq: req.addOnData,
        middlewareDataRes: res.addOnData
      }
    )
  )
})

app.post('/', log2, (req, res) => {
  console.log('  payload  : ', req.body)
  res.send({ msg: 'OK', middlewareData: res.addOnData })
})

/**
 * Mounting Item module Sub router here
 */
app.use('/api/item', router)

export const start = () => {
  app.listen(3000, () => {
    console.log('--Listen at 30000---')
  })
}
