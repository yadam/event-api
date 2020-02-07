"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;
let cache = {};
exports.set = (u) => {
    const existingUser = cache[u.email];
    const user = { ...existingUser, ...u };
    cache[user.email] = user;
    // Remove the password for returning
    const { password, ...outbound } = user;
    return outbound;
};
exports.isValid = (user) => {
    if (!user.email) {
        // required
        throw new Error('email is required');
    }
    if (!user.password) {
        // required
        throw new Error('password is required');
    }
    if (user.phone && !PHONE_REGEX.test(user.phone)) {
        // optional, but must match format
        throw new Error('phone must match XXX-XXX-XXXX');
    }
    return true;
};
// Internal functions for testing purposes
/* eslint-disable-next-line no-underscore-dangle */
exports._clearCache = () => {
    cache = {};
};
//# sourceMappingURL=users.js.map