import { Express } from 'express';
import productsRoutes from './products/routes';

export default (app: Express) => {
  app.use('/products', productsRoutes);

  app.use('/healthcheck', (req, res) => {
    res.status(200);
    res.end();
  });
};
