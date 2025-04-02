import { LoginCredentials } from "@/types/auth";
import { apiRequest } from "..";
import ApiEndpoints from "../endpoints";

export async function checkAuthStatus() {
  return apiRequest('get', ApiEndpoints.auth.check);
}

export async function loginRequest(credentials: LoginCredentials) {
  return apiRequest('post', ApiEndpoints.auth.login, { data: credentials });
}

export async function logoutRequest() {
  return apiRequest('post', ApiEndpoints.auth.logout);
}