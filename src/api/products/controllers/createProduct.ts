import { v2 as cloudinary } from 'cloudinary';
import * as z from 'zod';
import Product, { ProductSchema } from '../models/Product';
import { deleteFile, uploadFile } from '../../../config/multer';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express-serve-static-core';
import { serializeError } from 'serialize-error';

const CreateProductSchema = ProductSchema.pick({
  brand: true,
  description: true,
  name: true,
}).merge(
  z.object({
    price: z.transformer(z.string(), z.number(), (val) => +val),
  })
);

const createProduct = async (req: Request, res: Response) => {
  try {
    CreateProductSchema.parse(req.body);

    const params = req.body as z.infer<typeof CreateProductSchema>;

    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      ...params,
      productId: uuid(),
      imageUrl: uploadedImage.url,
    });

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: serializeError(error),
    });
  } finally {
    deleteFile(req.file.path);
  }
};

export default createProduct;
