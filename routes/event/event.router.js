const router = require('express').Router()
const { createEvent, getEventsByUserId, getSingleEvent, updateEvent, deleteEvent } = require('../../services/event/event.service')



router.post('',createEvent)
router.get('/user/:userId',getEventsByUserId)
router.get('/:id',getSingleEvent)
router.put('/:id',updateEvent)
router.delete('/:id',deleteEvent)


module.exports = router