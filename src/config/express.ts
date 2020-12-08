import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { environment } from './environment';
import routes from '../api/routes';

export function initializeExpress() {
  const app = express();

  app.use(
    cors((req, callback) => {
      callback(null, { origin: true });
    })
  );

  app.use(bodyParser.json());

  routes(app);

  app.listen(environment.PORT, () => {
    console.log(`Express server listening on port ${environment.PORT}`);
  });

  return app;
}
