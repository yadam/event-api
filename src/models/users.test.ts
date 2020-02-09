import { _clearCache, isValid, set } from './users';

describe('users', () => {
  beforeEach(() => {
    jest.resetModules();
    _clearCache();
  });

  it('should create a user', () => {
    const input = {
      email: 'adam@bantly.com',
      password: 'myPassword',
      phone: '123-456-7890',
    };
    const actual = set(input);
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
      const actual = isValid(input);
      expect(actual).toBeTruthy();
    });

    it('should validate a valid user without a phone', () => {
      const input = {
        email: 'adam@bantly.com',
        password: 'myPassword',
        phone: '',
      };
      const actual = isValid(input);
      expect(actual).toBeTruthy();
    });

    it('should throw an error for a missing email', () => {
      const input = {
        email: '',
        password: 'myPassword',
        phone: '123-456-7890',
      };

      expect(() => {
        isValid(input);
      }).toThrow('email is required');
    });

    it('should throw an error for a missing password', () => {
      const input = {
        email: 'adam@bantly.com',
        password: '',
        phone: '123-456-7890',
      };

      expect(() => {
        isValid(input);
      }).toThrow('password is required');
    });

    it('should throw an error for an invalid phone', () => {
      const input = {
        email: 'adam@bantly.com',
        password: 'myPassword',
        phone: '123',
      };

      expect(() => {
        isValid(input);
      }).toThrow('phone must match XXX-XXX-XXXX');
    });
  });
});
