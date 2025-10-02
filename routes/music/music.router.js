const router = require('express').Router()
const { multipleupload } = require('../../config/multer.config')
const { createMusic, getMusic, getSingleMusic, getMusicByCategory, getMusicByArtist, getMusicByAlbum, getMusicByUserId } = require('../../services/music/music.service')


router.post("/create", multipleupload.fields([{ name: "image", maxCount: 1 }, { name: "song", maxCount: 1 }]), createMusic)
router.get("/user/:id", getMusicByUserId)
router.get("/all", getMusic)
router.get("/single/:id", getSingleMusic)
router.get("/category/:id", getMusicByCategory)
router.get("/artist/:id", getMusicByArtist)
router.get("/album/:id", getMusicByAlbum)



module.exports = router