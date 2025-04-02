import { apiRequest } from '..';
import ApiEndpoints from '../endpoints';
import { CreateUserDto } from './types';

export async function createUser(data: CreateUserDto) {
  return apiRequest('post', ApiEndpoints.user.create, { data });
}

export async function getAllUsers() {
  return apiRequest('get', ApiEndpoints.user.getAll);
}

export async function getUserById(id: string) {
  return apiRequest('get', ApiEndpoints.user.getById(id));
}

export async function updateUser(id: string, data: Partial<CreateUserDto>) {
  return apiRequest('patch', ApiEndpoints.user.update(id), { data });
}

export async function deleteUser(id: string) {
  return apiRequest('delete', ApiEndpoints.user.delete(id));
}