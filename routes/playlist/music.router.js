const { saveMusic, getPlaylistMusic } = require('../../services/playlist/music.service')

const router = require('express').Router()


router.post('/create',saveMusic)
router.get('/all/:id',getPlaylistMusic)
module.exports = router