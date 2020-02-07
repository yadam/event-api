"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
describe('events', () => {
    beforeEach(() => {
        jest.resetModules();
        events_1._clearCache();
    });
    it('should create a new event', () => {
        const input = { type: 'LOGIN', userId: 'adam@bantly.com' };
        const actual = events_1.set(input);
        expect(actual.type).toEqual('LOGIN');
        expect(actual.userId).toEqual('adam@bantly.com');
        expect(actual.id).not.toBeUndefined();
        expect(actual.createdOn instanceof Date).toBeTruthy();
    });
    it('should get all events for all users', () => {
        const input = [
            { type: 'LOGIN', userId: 'adam@bantly.com' },
            { type: 'LOGIN', userId: 'bob@bantly.com' },
            { type: 'CLICK', userId: 'adam@bantly.com' },
            { type: 'CLICK', userId: 'adam@bantly.com' },
            { type: 'LOGOUT', userId: 'adam@bantly.com' },
        ];
        for (let i = 0; i < input.length; i += 1) {
            events_1.set(input[i]);
        }
        const actual = events_1.get();
        expect(actual.length).toEqual(input.length);
        for (let j = 0; j < actual.length; j += 1) {
            expect(actual[j].type).toEqual(input[j].type);
            expect(actual[j].userId).toEqual(input[j].userId);
        }
    });
    it('should get all events for a single user', () => {
        const input = [
            { type: 'LOGIN', userId: 'adam@bantly.com' },
            { type: 'LOGIN', userId: 'bob@bantly.com' },
            { type: 'CLICK', userId: 'adam@bantly.com' },
            { type: 'CLICK', userId: 'adam@bantly.com' },
            { type: 'LOGOUT', userId: 'adam@bantly.com' },
        ];
        for (let i = 0; i < input.length; i += 1) {
            events_1.set(input[i]);
        }
        const actualAdam = events_1.get('adam@bantly.com');
        expect(actualAdam.length).toEqual(input.length - 1);
        for (let j = 0; j < actualAdam.length; j += 1) {
            expect(actualAdam[j].userId).toEqual('adam@bantly.com');
        }
        const actualBob = events_1.get('bob@bantly.com');
        expect(actualBob.length).toEqual(1);
        for (let j = 0; j < actualBob.length; j += 1) {
            expect(actualBob[j].userId).toEqual('bob@bantly.com');
        }
    });
    describe('date ranges', () => {
        it('should get events for a specific time range', () => {
            const input = [
                { type: 'LOGIN', userId: 'adam@bantly.com' },
                { type: 'LOGIN', userId: 'bob@bantly.com' },
                { type: 'CLICK', userId: 'adam@bantly.com' },
                { type: 'CLICK', userId: 'adam@bantly.com' },
                { type: 'LOGOUT', userId: 'adam@bantly.com' },
            ];
            const startTime = Date.now();
            for (let i = 0; i < input.length; i += 1) {
                events_1.set(input[i]);
            }
            // Modify the data by setting the first 3 records to have an older createdOn date
            const cache = events_1._getCache();
            const updated = { ...cache };
            const keys = Object.keys(updated);
            updated[keys[0]].createdOn = new Date(Date.now() - 100);
            updated[keys[1]].createdOn = new Date(Date.now() - 100);
            updated[keys[2]].createdOn = new Date(Date.now() - 100);
            events_1._setCache(updated);
            let actual = events_1.get(undefined, startTime, Date.now());
            expect(actual.length).toEqual(2);
            actual = events_1.get(undefined, '0', startTime - 50);
            expect(actual.length).toEqual(3);
        });
        it('should default missing start or end dates', () => {
            const input = [
                { type: 'LOGIN', userId: 'adam@bantly.com' },
                { type: 'LOGIN', userId: 'bob@bantly.com' },
                { type: 'CLICK', userId: 'adam@bantly.com' },
                { type: 'CLICK', userId: 'adam@bantly.com' },
                { type: 'LOGOUT', userId: 'adam@bantly.com' },
            ];
            const startTime = Date.now();
            for (let i = 0; i < input.length; i += 1) {
                events_1.set(input[i]);
            }
            // Modify the data by setting the first 3 records to have an older createdOn date
            const cache = events_1._getCache();
            const updated = { ...cache };
            const keys = Object.keys(updated);
            updated[keys[0]].createdOn = new Date(Date.now() - 100);
            updated[keys[1]].createdOn = new Date(Date.now() - 100);
            updated[keys[2]].createdOn = new Date(Date.now() - 100);
            events_1._setCache(updated);
            let actual = events_1.get(undefined, startTime);
            expect(actual.length).toEqual(2);
            actual = events_1.get(undefined, undefined, startTime - 50);
            expect(actual.length).toEqual(3);
        });
    });
    describe('validation', () => {
        it('should validate a valid event', () => {
            const input = { type: 'LOGIN', userId: 'adam@bantly.com' };
            const actual = events_1.isValid(input);
            expect(actual).toBeTruthy();
        });
        it('should throw an error for a missing type', () => {
            const input = { type: '', userId: 'adam@bantly.com' };
            expect(() => {
                events_1.isValid(input);
            }).toThrow('type is required');
        });
    });
});
//# sourceMappingURL=events.test.js.map