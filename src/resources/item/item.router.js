import { Router } from 'express'

const controller = (req, res, next) => {
  res.send({ message: 'Hello items...' })
}

const router = Router()
// api/item
router
  .route('/')
  .get(controller)
  .post(controller)

// /api/item
router
  .route('/:id')
  .put(controller)
  .delete(controller)
  .get(controller)

export default router
