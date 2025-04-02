import { User } from "../models/user.model";
import mongoose from "mongoose";
import { DatabaseError, NotFoundError, ValidationError } from "../utils/errors";

export async function getAll() {
  try {
    return await User.find();
  } catch (error) {
    throw new DatabaseError("Failed to retrieve users", error);
  }
}

export async function get(userId: string) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User", userId);
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("User", userId);
    }
    throw new DatabaseError("Failed to retrieve user", error);
  }
}

export async function create(data: any) {
  try {
    return await User.create(data);
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError("Invalid user data", error.errors);
    }
    if (error.code === 11000) {
      throw new ValidationError("User with this email already exists", error);
    }
    throw new DatabaseError("Failed to create user", error);
  }
}

export async function update(userId: string, data: any) {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      data,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError("User", userId);
    }

    return user;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.ValidationError) {
      throw new ValidationError("Invalid user data", error.errors);
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("User", userId);
    }
    if (error.code === 11000) {
      throw new ValidationError("User with this email already exists", error);
    }
    throw new DatabaseError("Failed to update user", error);
  }
}

export async function remove(userId: string) {
  try {
    const user = await User.deleteOne({ _id: userId });

    if (!user) {
      throw new NotFoundError("User", userId);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundError("User", userId);
    }
    throw new DatabaseError("Failed to delete user", error);
  }
}