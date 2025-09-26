import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  sectionIds: mongoose.Types.ObjectId[];
  displayImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sectionIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  }],
  displayImage: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);