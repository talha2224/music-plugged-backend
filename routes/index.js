const combineRouter = require('express').Router()
const accountRoutes = require("./account/account.router")
const artistRoutes = require("./artist/artist.router")
const categoryRoutes = require("./category/category.router")
const musicRoutes = require("./music/music.router")
const albumRoutes = require("./album/album.router")
const saveRoutes = require("./saved/saved.router")
const playlistRoutes = require("./playlist/playlist.router")
const palylistMusicRoutes = require("./playlist/music.router")
const historyRoutes = require("./history/history.router")
const likeRoutes = require("./like/like.router")
const followRoutes = require("./follow/follow.router")
const moodRoutes = require("./mood/mood.router")




combineRouter.use("/account",accountRoutes)
combineRouter.use("/prefference",artistRoutes)
combineRouter.use("/category",categoryRoutes)
combineRouter.use("/music",musicRoutes)
combineRouter.use("/album",albumRoutes)
combineRouter.use("/save",saveRoutes)
combineRouter.use("/playlist",playlistRoutes)
combineRouter.use("/playlist/music",palylistMusicRoutes)
combineRouter.use("/history",historyRoutes)
combineRouter.use("/like",likeRoutes)
combineRouter.use("/artist",followRoutes)
combineRouter.use("/mood",moodRoutes)








module.exports = combineRouter