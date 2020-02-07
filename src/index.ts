import express from 'express';
import { router } from './routes';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

export const server = app.listen(PORT, (err: Error) => {
  /* istanbul ignore if */
  if (err) {
    /* eslint-disable-next-line no-console */
    return console.error(err);
  }
  /* eslint-disable-next-line no-console */
  return console.log(`server is listening on ${PORT}`);
});
