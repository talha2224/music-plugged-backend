const router = require("express").Router();
const { multipleupload } = require("../../config/multer.config");
const {
    createShortMusic,
    getAllShortMusic,
    getShortMusicByUser,
    getSingleShortMusic,
    deleteShortMusic
} = require("../../services/shorts/shortMusic.service");

router.post("/", multipleupload.single("video"), createShortMusic);
router.get("/", getAllShortMusic);
router.get("/user/:userId", getShortMusicByUser);
router.get("/:id", getSingleShortMusic);
router.delete("/:id", deleteShortMusic);

module.exports = router;
