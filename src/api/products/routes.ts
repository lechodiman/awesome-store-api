import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile, uploadFile } from '../../config/multer';
import Product, { ProductModel } from './models/Product';
import { v4 as uuid } from 'uuid';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json({
    products,
  });
});

type CreateProductDto = {
  brand: ProductModel['brand'];
  name: ProductModel['name'];
  description: ProductModel['description'];
  price: ProductModel['price'];
};

router.post('/', uploadFile.single('image'), async (req, res) => {
  try {
    const params = req.body as CreateProductDto;

    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    const product = await Product.create({
      ...params,
      productId: uuid(),
      imageUrl: uploadedImage.url,
    });

    res.json({ product });

    deleteFile(req.file.path);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:productId', async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId });

  await cloudinary.uploader.destroy(product.imageUrl);
  await product.remove();
  res.json(product);
});

router.put('/:productId', uploadFile.single('image'), async (req, res) => {
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
});

export default router;
