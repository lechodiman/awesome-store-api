import Product from '../models/Product';
import { Request, Response } from 'express-serve-static-core';

const listProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.json({
    products,
  });
};

export default listProducts;
