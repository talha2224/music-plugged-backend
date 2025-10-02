const { createSave, getAllSaves, getSaveByUserId, getSingleSave, deleteSingleSave, deleteAllSavesByUserId } = require("../../services/save/save.service");


const router = require("express").Router();

router.post("/create", createSave);
router.get("/all", getAllSaves);
router.get("/user/:id", getSaveByUserId);
router.get("/single/:id", getSingleSave);
router.delete("/:id", deleteSingleSave);
router.delete("/user/:id", deleteAllSavesByUserId);

module.exports = router;
