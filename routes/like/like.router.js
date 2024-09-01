const { createLike,getLike } = require('../../services/like/like.service')

const router = require('express').Router()


router.post('/create',createLike)
router.get('/all/:id',getLike)
module.exports = router