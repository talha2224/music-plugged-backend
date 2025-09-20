const router = require('express').Router()
const { multipleupload } = require('../../config/multer.config')
const { registerUser, loginUser, getUser, createSubscription, storeSubscription, updateUser } = require('../../services/account/account.service')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/single/:id',getUser)
router.post('/subscribe',createSubscription)
router.post('/store/subscription',storeSubscription)
router.put("/:id",multipleupload.single("image"),updateUser)

module.exports = router