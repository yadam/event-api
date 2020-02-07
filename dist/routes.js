"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./models/users");
const events_1 = require("./models/events");
exports.router = express_1.Router();
exports.router.get('/events', (req, res) => {
    const { startDate, endDate } = req.query;
    res.send(events_1.get(undefined, startDate, endDate));
});
exports.router.post('/users', (req, res) => {
    const user = req.body;
    try {
        users_1.isValid(user);
    }
    catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.send(users_1.set(user));
});
exports.router.get('/users/:id/events', (req, res) => {
    const { startDate, endDate } = req.query;
    res.send(events_1.get(req.params.id, startDate, endDate));
});
exports.router.post('/users/:id/events', (req, res) => {
    const event = req.body;
    event.userId = req.params.id;
    try {
        events_1.isValid(event);
    }
    catch (error) {
        res.status(400).send(error.message);
        return;
    }
    res.send(events_1.set(event));
});
//# sourceMappingURL=routes.js.map