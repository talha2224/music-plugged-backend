const { createMood, getMood } = require('../../services/mood/mood.service')

const router = require('express').Router()



router.post('/create',createMood)
router.get('/all',getMood)


module.exports = router