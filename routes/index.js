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
const eventRoutes = require("./event/event.router")
const shortMusicRoutes = require("./shorts/shortMusic.router")
const episodeRoutes = require("./episodes/episodes.router")
const savedRoutes = require("./save/save.router")




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
combineRouter.use("/event",eventRoutes)
combineRouter.use("/shorts",shortMusicRoutes)
combineRouter.use("/episodes",episodeRoutes)
combineRouter.use("/saved",savedRoutes)








module.exports = combineRouter