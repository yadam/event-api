"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cuid_1 = __importDefault(require("cuid"));
let cache = {};
exports.get = (userId = undefined, start = 0, end = Date.now()) => {
    const result = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    Object.values(cache).forEach(event => {
        if (event.created >= startDate && event.created <= endDate) {
            if (!userId || event.userId === userId) {
                result.push(event);
            }
        }
    });
    return result;
};
exports.set = (e) => {
    const event = { ...e, id: cuid_1.default(), created: new Date() };
    cache[event.id] = event;
    return event;
};
exports.isValid = (event) => {
    if (!event.type) {
        // required
        throw new Error('type is required');
    }
    return true;
};
// Internal functions for testing purposes
/* eslint-disable-next-line no-underscore-dangle */
exports._clearCache = () => {
    cache = {};
};
/* eslint-disable-next-line no-underscore-dangle */
exports._getCache = () => cache;
/* eslint-disable-next-line no-underscore-dangle */
exports._setCache = (updated) => {
    cache = updated;
};
//# sourceMappingURL=events.js.map