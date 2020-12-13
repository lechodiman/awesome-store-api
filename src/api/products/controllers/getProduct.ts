import Product from '../models/Product';
import { Request, Response } from 'express-serve-static-core';

const getProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({
    productId: req.params.productId,
  });

  res.json(product);
};

export default getProduct;
