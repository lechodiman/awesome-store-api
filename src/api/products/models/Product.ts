import { Document, model, Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

interface ProductModel extends Document {
  productId: string;
  brand: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

const ProductSchema = new Schema(
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

export default model<ProductModel>('Product', ProductSchema);
