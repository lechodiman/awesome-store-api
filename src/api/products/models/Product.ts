import { Document, model, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';

export const ProductSchema = z.object({
  productId: z.string().uuid(),
  brand: z.string(),
  name: z.string(),
  imageUrl: z.string().url(),
  description: z.string(),
  price: z.number().positive(),
});

export interface ProductModel extends Document, z.infer<typeof ProductSchema> {}

const ProductMongoSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: uuid,
      index: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ProductModel>('Product', ProductMongoSchema);
