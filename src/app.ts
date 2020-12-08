import { initializeExpress } from './config/express';
import { initializeMongo } from './config/mongo';

const initializeApp = () => {
  const expressApp = initializeExpress();

  const app = {
    api: {
      express: expressApp,
    },
    services: {
      mongo: initializeMongo(),
    },
  };

  return app;
};

try {
  initializeApp();
} catch (error) {
  console.log(`Error initializing app: ${error}`);
}
