const { multipleupload } = require('../../config/multer.config')
const {
    createPlaylist,
    getPlaylist,
    getSinglePlaylist,
    getPublicPlaylists,
    addMusicToPlaylist,
    removeMusicFromPlaylist,
    updatePlaylist
} = require('../../services/playlist/playlist.service')

const router = require('express').Router()

router.post("/create",multipleupload.fields([{ name: "image", maxCount: 1 }]), createPlaylist)
router.get("/all/:id", getPlaylist)
router.get("/single/:id", getSinglePlaylist)
router.get("/public", getPublicPlaylists)
router.post("/add-music", addMusicToPlaylist)
router.post("/remove-music", removeMusicFromPlaylist)
router.put("/update", updatePlaylist)

module.exports = router
