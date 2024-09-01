const accountModel = require("./account/account.model")
const artistModel = require("./artist/artist.model")
const categoryModel = require("./category/category.model")
const musicModel = require("./music/music.model")
const albumModel = require("./album/album.model")
const savedModel = require("./saved/saved.model")
const historyModel = require("./history/history.model")
const playlistModel = require("./playlist/playlist.model")
const playlistMusicModel = require("./playlist/playlist_music.model")
const likeMusicModel = require("./like/like.model")

module.exports = {accountModel,artistModel,categoryModel,musicModel,albumModel,historyModel,savedModel,playlistModel,playlistMusicModel,likeMusicModel}