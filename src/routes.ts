import { Request, Response, Router } from 'express';
import {
  isValid as userIsValid,
  set as createUser,
  User,
} from './models/users';
import {
  InboundEvent,
  get as getEvents,
  isValid as eventIsValid,
  set as createEvent,
} from './models/events';

export const router = Router();

router.get('/events', (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  res.send(getEvents(undefined, startDate, endDate));
});

router.post('/users', (req: Request, res: Response) => {
  const user: User = req.body;
  try {
    userIsValid(user);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
  res.send(createUser(user));
});

router.get('/users/:id/events', (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  res.send(getEvents(req.params.id, startDate, endDate));
});

router.post('/users/:id/events', (req: Request, res: Response) => {
  const event: InboundEvent = req.body;
  event.userId = req.params.id;
  try {
    eventIsValid(event);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
  res.send(createEvent(event));
});
