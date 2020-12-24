import express from 'express';
import { uploadFile } from '../../config/multer';
import bulkDeleteProducts from './controllers/bulkDeleteProducts';
import createProduct from './controllers/createProduct';
import deleteProduct from './controllers/deleteProduct';
import getProduct from './controllers/getProduct';
import listProducts from './controllers/listProducts';
import updateProduct from './controllers/updateProduct';

const router = express.Router();

router.get('/', listProducts);

router.delete('/', bulkDeleteProducts);

router.get('/:productId', getProduct);

router.post('/', uploadFile.single('image'), createProduct);

router.delete('/:productId', deleteProduct);

router.put('/:productId', uploadFile.single('image'), updateProduct);

export default router;
