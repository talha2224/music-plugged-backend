const router = require('express').Router()
const { registerUser, loginUser, getUser, createSubscription } = require('../../services/account/account.service')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/single/:id',getUser)
router.post('/subscribe',createSubscription)

module.exports = router