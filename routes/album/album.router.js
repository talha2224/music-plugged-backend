const router = require('express').Router()
const { multipleupload } = require('../../config/multer.config')
const { createAlbum, getAlbum, getSingleAlbum, getAlbumByCategory, getAlbumByArtist } = require('../../services/album/album.service')


router.post("/create",multipleupload.single("image"),createAlbum)
router.get("/all",getAlbum)
router.get("/single/:id",getSingleAlbum)
router.get("/category/:id",getAlbumByCategory)
router.get("/artist/:id",getAlbumByArtist)



module.exports = router