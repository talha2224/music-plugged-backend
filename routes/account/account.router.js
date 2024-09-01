const router = require('express').Router()
const { registerUser, loginUser, getUser } = require('../../services/account/account.service')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/single/:id',getUser)

module.exports = router