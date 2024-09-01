const router = require('express').Router()
const { getSaveMusic, saveMusic } = require("../../services/saved/saved.service");


router.post('/create',saveMusic)
router.get('/all/:id',getSaveMusic)
module.exports = router