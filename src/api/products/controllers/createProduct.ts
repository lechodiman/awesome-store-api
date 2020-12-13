import { v2 as cloudinary } from 'cloudinary';
import * as z from 'zod';
import Product, { ProductSchema } from '../models/Product';
import { deleteFile, uploadFile } from '../../../config/multer';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express-serve-static-core';

const createProductSchema = ProductSchema.pick({
  brand: true,
  description: true,
  name: true,
  price: true,
});

const createProduct = async (req: Request, res: Response) => {
  try {
    const params = req.body as z.infer<typeof createProductSchema>;

    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      ...params,
      productId: uuid(),
      imageUrl: uploadedImage.url,
    });

    res.json(product);

    deleteFile(req.file.path);
  } catch (error) {
    console.log(error);
  }
};

export default createProduct;
