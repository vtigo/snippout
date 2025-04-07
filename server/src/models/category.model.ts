import mongoose from "mongoose";

export interface ICategory {
  name: string;
  description?: string;
  user: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  color?: string;
}

type CategoryModel = mongoose.Model<ICategory>;

const CategorySchema = new mongoose.Schema<ICategory, CategoryModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  color: {
    type: String,
    required: false,
    validate: {
      validator: function (v: string) {
        return /^#([0-9a-fA-F]{6})$/.test(v);
      },
    },
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Category = mongoose.model<ICategory, CategoryModel>("Category", CategorySchema);

export {
  Category,
  CategorySchema,
};