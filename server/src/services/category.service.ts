import mongoose from "mongoose";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/errors";
import { Category } from "../models/category.model";

export async function getAll() {
  try {
    return await Category.find();
  } catch (error) {
    throw new DatabaseError("Failed to retrieve categories", error);
  }
}

export async function get(categoryId: string) {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new NotFoundError("Category", categoryId);
    }
    return category;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Category", categoryId);
    }
    throw new DatabaseError("Failed to retrieve category", error);
  }
}

export async function create(data: any) {
  try {
    return await Category.create(data);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError("Invalid category data", error.errors);
    }
    if (error.code === 11000) {
      throw new ValidationError("Category already exists", error);
    }
    throw new DatabaseError("Failed to create category", error);
  }
}

export async function update(categoryId: string, data: any) {
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      data,
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new NotFoundError("Category", categoryId);
    }

    return category;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError("Invalid category data", error.errors);
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Category", categoryId);
    }
    if (error.code === 11000) {
      throw new ValidationError("Category with this email already exists", error);
    }
    throw new DatabaseError("Failed to update category", error);
  }
}

export async function remove(categoryId: string) {
  try {
    const category = await Category.deleteOne({ _id: categoryId });

    if (!category) {
      throw new NotFoundError("Category", categoryId);
    }

    return category;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("Category", categoryId);
    }
    throw new DatabaseError("Failed to delete category", error);
  }
}