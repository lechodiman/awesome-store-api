import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from '../../../config/multer';
import Product, { ProductSchema } from '../models/Product';
import { Request, Response } from 'express-serve-static-core';
import * as z from 'zod';

const updateProductSchema = ProductSchema.omit({
  productId: true,
  imageUrl: true,
}).partial();

const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ productId: req.params.productId });

  const params = req.body as z.infer<typeof updateProductSchema>;

  let imageUrl = product.imageUrl;

  if (req.file) {
    await cloudinary.uploader.destroy(product.imageUrl);
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    deleteFile(req.file.path);

    imageUrl = uploadedImage.url;
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { productId: product.productId },
    {
      ...params,
      imageUrl,
    },
    { omitUndefined: true, new: true }
  );

  res.json({
    product: updatedProduct,
  });
};

export default updateProduct;
