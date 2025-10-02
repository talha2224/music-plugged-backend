const { multipleupload } = require('../../config/multer.config');
const { createEpisode, getAllEpisodes, getSingleEpisode, getEpisodesByUser, deleteEpisode } = require('../../services/episodes/episodes.service');

const router = require('express').Router();

router.post("/create", multipleupload.fields([{ name: "image", maxCount: 1 },{ name: "audio", maxCount: 1 }]), createEpisode);
router.get("/all", getAllEpisodes);
router.get("/single/:id", getSingleEpisode);
router.get("/user/:userId", getEpisodesByUser);
router.delete("/:id", deleteEpisode);

module.exports = router;
