const { createHistory, getHistory } = require('../../services/history/history.service')

const router = require('express').Router()


router.post('/create',createHistory)
router.get('/all/:id',getHistory)
module.exports = router