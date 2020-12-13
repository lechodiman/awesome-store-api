import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product';
import { Request, Response } from 'express-serve-static-core';

const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ productId: req.params.productId });

  await cloudinary.uploader.destroy(product.imageUrl);
  await product.remove();

  res.json({ product });
};

export default deleteProduct;
