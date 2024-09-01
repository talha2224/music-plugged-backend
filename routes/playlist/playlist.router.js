const { createPlaylist, getPlaylist } = require('../../services/playlist/playlist.service')

const router = require('express').Router()


router.post("/create",createPlaylist)
router.get("/all/:id",getPlaylist)


module.exports = router