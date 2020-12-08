import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { environment } from './environment';

export function initializeExpress() {
  const app = express();

  app.use(
    cors((req, callback) => {
      callback(null, { origin: true });
    })
  );

  app.use(bodyParser.json());

  app.listen(environment.PORT, () => {
    console.log(`Express server listening on port ${environment.PORT}`);
  });

  return app;
}
