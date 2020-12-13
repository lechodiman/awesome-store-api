import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from '../../../config/multer';
import Product from '../models/Product';
import { Request, Response } from 'express-serve-static-core';

const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ productId: req.params.productId });

  const params = req.body;

  let imageUrl = product.imageUrl;
  if (req.file) {
    await cloudinary.uploader.destroy(product.imageUrl);
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
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

  if (req.file) {
    deleteFile(req.file.path);
  }

  res.json({
    message: 'Update',
  });
};

export default updateProduct;
