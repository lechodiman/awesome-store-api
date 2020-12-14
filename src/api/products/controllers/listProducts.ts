import Product from '../models/Product';
import * as z from 'zod';
import { Request, Response } from 'express-serve-static-core';
import { serializeError } from 'serialize-error';

const ListQuerySchema = z.object({
  search: z.string().min(3).optional(),
});

const listProducts = async (req: Request, res: Response) => {
  try {
    ListQuerySchema.parse(req.query);

    const { search = '.*' } = req.query as z.infer<typeof ListQuerySchema>;

    const products = await Product.find({
      $or: [
        {
          brand: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          productId: search,
        },
        {
          description: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(400).json({
      message: serializeError(error),
    });
  }
};

export default listProducts;
