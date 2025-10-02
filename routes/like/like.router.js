const { createLike,getLike, deleteLike } = require('../../services/like/like.service')

const router = require('express').Router()


router.post('/create',createLike)
router.post('/delete',deleteLike)
router.get('/all/:id',getLike)
module.exports = router