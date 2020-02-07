"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
describe('users', () => {
    beforeEach(() => {
        jest.resetModules();
        users_1._clearCache();
    });
    it('should create a user', () => {
        const input = {
            email: 'adam@bantly.com',
            password: 'myPassword',
            phone: '123-456-7890',
        };
        const actual = users_1.set(input);
        expect(actual.email).toEqual(input.email);
        expect(actual.phone).toEqual(input.phone);
    });
    describe('validation', () => {
        it('should validate a valid user', () => {
            const input = {
                email: 'adam@bantly.com',
                password: 'myPassword',
                phone: '123-456-7890',
            };
            const actual = users_1.isValid(input);
            expect(actual).toBeTruthy();
        });
        it('should validate a valid user without a phone', () => {
            const input = {
                email: 'adam@bantly.com',
                password: 'myPassword',
                phone: '',
            };
            const actual = users_1.isValid(input);
            expect(actual).toBeTruthy();
        });
        it('should throw an error for a missing email', () => {
            const input = {
                email: '',
                password: 'myPassword',
                phone: '123-456-7890',
            };
            expect(() => {
                users_1.isValid(input);
            }).toThrow('email is required');
        });
        it('should throw an error for a missing password', () => {
            const input = {
                email: 'adam@bantly.com',
                password: '',
                phone: '123-456-7890',
            };
            expect(() => {
                users_1.isValid(input);
            }).toThrow('password is required');
        });
        it('should throw an error for an invalid phone', () => {
            const input = {
                email: 'adam@bantly.com',
                password: 'myPassword',
                phone: '123',
            };
            expect(() => {
                users_1.isValid(input);
            }).toThrow('phone must match XXX-XXX-XXXX');
        });
    });
});
//# sourceMappingURL=users.test.js.map