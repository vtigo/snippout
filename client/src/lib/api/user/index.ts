import { api } from "..";
import ApiEndpoints from "../endpoints";
import { CreateUserDto } from "./types";

export async function createUser(data: CreateUserDto) {
  try {
    const response = await api.post(ApiEndpoints.user.create, data);
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function getAllUsers() {
  try {
    const response = await api.get(ApiEndpoints.user.getAll);
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function getUserById(id: string) {
  try {
    const response = await api.get(ApiEndpoints.user.getById(id));
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function updateUser(id: string, data: Partial<CreateUserDto>) {
  try {
    const response = await api.put(ApiEndpoints.user.update, { id, ...data });
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    return {
      success: false,
      error: errorMessage
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await api.delete(ApiEndpoints.user.delete, { data: { id } });
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message;
    return {
      success: false,
      error: errorMessage
    };
  }
}