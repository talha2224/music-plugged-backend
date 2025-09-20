const { eventModel } = require("../../models");

const createEvent = async (req, res) => {
    try {
        const { userId, event_link, event_date, event_time, event_duration, event_location, other_details } = req.body;

        const newEvent = await eventModel.create({
            userId,
            event_link,
            event_date,
            event_time,
            event_duration,
            event_location,
            other_details
        });

        return res.status(200).json({ msg: "eventModel Created", data: newEvent, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const getEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const events = await eventModel.find({ userId });

        return res.status(200).json({ msg: null, data: events, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const getSingleEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventModel.findById(id);

        if (!event) {
            return res.status(404).json({ msg: "eventModel not found", code: 404 });
        }

        return res.status(200).json({ msg: null, data: event, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedEvent = await eventModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ msg: "eventModel not found", code: 404 });
        }

        return res.status(200).json({ msg: "eventModel Updated", data: updatedEvent, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await eventModel.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ msg: "eventModel not found", code: 404 });
        }

        return res.status(200).json({ msg: "eventModel Deleted", data: deletedEvent, code: 200 });
    } catch (error) {
        return res.status(500).json({ msg: error.message, code: 500 });
    }
};

module.exports = {
    createEvent,
    getEventsByUserId,
    getSingleEvent,
    updateEvent,
    deleteEvent
};
