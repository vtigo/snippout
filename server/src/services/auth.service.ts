import { User } from "../models/user.model";
import { AuthUser, LoginCredentials, RegisterCredentials } from "../types/auth";
import { generateToken } from "../utils/jwt";
import { AuthError, ValidationError } from "../utils/errors";

/**
 * Register a new user
 */
export async function registerUser(userData: RegisterCredentials): Promise<AuthUser> {
  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email: userData.email }, { username: userData.username }]
  });

  if (existingUser) {
    if (existingUser.email === userData.email) {
      throw new ValidationError("Email already in use");
    }
    throw new ValidationError("Username already taken");
  }

  // Create new user
  const user = await User.create(userData);

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username
  };
}

/**
 * Login a user
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthUser> {
  // Find user by email
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    throw new AuthError("Invalid email or password");
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(credentials.password);
  if (!isPasswordValid) {
    throw new AuthError("Invalid email or password");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username
  };
}

/**
 * Check auth status
 */
export async function checkStatus(userId: string): Promise<AuthUser> {
  const user = await User.findById(userId);

  if (!user) {
    throw new AuthError("User not found");
  }

  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username
  };
}