const router = require('express').Router()
const { multipleupload } = require('../../config/multer.config')
const { createArtist, getAllArtist } = require('../../services/artist/artist.service')



router.post('/create',multipleupload.single("image"),createArtist)
router.get('/all',getAllArtist)


module.exports = router