"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const _1 = require(".");
const users_1 = require("./models/users");
const events_1 = require("./models/events");
jest.mock('./models/users', () => ({
    set: jest.fn(() => 'Success!'),
    isValid: jest.fn(() => true),
}));
jest.mock('./models/events', () => ({
    get: jest.fn(() => 'some events'),
    set: jest.fn(() => 'Success!'),
    isValid: jest.fn(() => true),
}));
let request;
describe('routes', () => {
    describe('users', () => {
        beforeEach(() => {
            request = supertest_1.default.agent(_1.server);
        });
        afterEach(() => {
            _1.server.close();
        });
        it('should create a user', async () => {
            await request
                .post('/users')
                .send({ email: 'adam@bantly.com' })
                .expect(200)
                .then(response => {
                expect(response.text).toEqual('Success!');
            });
        });
        it('should not create an invalid user', async () => {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            users_1.isValid.mockImplementation(() => {
                throw new Error('invalid');
            });
            await request
                .post('/users')
                .send({ email: 'adam@bantly.com' })
                .expect(400)
                .then(response => {
                expect(response.text).toEqual('invalid');
            });
        });
    });
    describe('events', () => {
        it('should get all events', async () => {
            await request
                .get('/events')
                .expect(200)
                .then(response => {
                expect(response.text).toEqual('some events');
            });
        });
        it('should get all events for a user', async () => {
            await request
                .get('/users/12345/events')
                .expect(200)
                .then(response => {
                expect(response.text).toEqual('some events');
            });
        });
        it('should create an event', async () => {
            await request
                .post('/users/12345/events')
                .send({ type: 'LOGIN' })
                .expect(200)
                .then(response => {
                expect(response.text).toEqual('Success!');
            });
        });
        it('should not create an event if it is invalid', async () => {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            events_1.isValid.mockImplementation(() => {
                throw new Error('invalid');
            });
            await request
                .post('/users/12345/events')
                .send({ type: '' })
                .expect(400)
                .then(response => {
                expect(response.text).toEqual('invalid');
            });
        });
    });
});
//# sourceMappingURL=routes.test.js.map