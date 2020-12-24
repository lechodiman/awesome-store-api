import Product from '../models/Product';
import { Request, Response } from 'express-serve-static-core';

const bulkDeleteProducts = async (req: Request, res: Response) => {
  const response = await Product.deleteMany({});

  res.json(response);
};

export default bulkDeleteProducts;
