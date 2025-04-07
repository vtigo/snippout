import { apiRequest } from "..";
import ApiEndpoints from "../endpoints";
import { CreateCategoryDto } from "./types";

export async function createCategory(data: CreateCategoryDto) {
  return apiRequest("post", ApiEndpoints.category.create, { data })
}

export async function getAllCategories() {
  const response = await apiRequest("get", ApiEndpoints.category.getAll)
  return response.data
}

export async function getCategoryById(id: string) {
  return apiRequest("get", ApiEndpoints.category.getById(id))
}

export async function updateCategory(id: string, data: Partial<CreateCategoryDto>) {
  return apiRequest("patch", ApiEndpoints.category.update(id), { data })
}

export async function deleteCategory(id: string) {
  return apiRequest("delete", ApiEndpoints.category.delete(id))
}
