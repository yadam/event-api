import supertest, { SuperTest, Test } from 'supertest';
import { server } from '.';
import { isValid as userIsValid } from './models/users';
import { isValid as eventIsValid } from './models/events';

jest.mock('./models/users', () => ({
  set: jest.fn((): string => 'Success!'),
  isValid: jest.fn((): boolean => true),
}));

jest.mock('./models/events', () => ({
  get: jest.fn((): string => 'some events'),
  set: jest.fn((): string => 'Success!'),
  isValid: jest.fn((): boolean => true),
}));

let request: SuperTest<Test>;

describe('routes', () => {
  describe('users', () => {
    beforeEach(() => {
      request = supertest.agent(server);
    });

    afterEach(() => {
      server.close();
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
      (userIsValid as jest.Mock<any>).mockImplementation(() => {
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
      (eventIsValid as jest.Mock<any>).mockImplementation(() => {
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
