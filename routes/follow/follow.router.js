const { followArtist, unFollowArtist, getFollowArtist } = require('../../services/follow/follow.service')

const router = require('express').Router()



router.post('/follow',followArtist)
router.put('/unfollow/:id',unFollowArtist)
router.get('/follow/:userId/:artistId',getFollowArtist)


module.exports = router