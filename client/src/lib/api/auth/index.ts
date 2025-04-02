import { LoginCredentials } from "@/types/auth"
import { api } from ".."
import ApiEndpoints from "../endpoints"

export async function checkAuthStatus() {
  try {
    const response = await api.get(ApiEndpoints.auth.check)
    if (response.status >= 400) {
      throw response
    }
    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage = error.data?.message || error.message
    return { success: false, error: errorMessage }
  }
}

export async function loginRequest({ email, password }: LoginCredentials) {
  try {
    const response = await api.post(ApiEndpoints.auth.login, {
      email,
      password
    })

    if (response.status >= 400) {
      throw response
    }

    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage = error.data?.message || error.message
    return { success: false, error: errorMessage }
  }
}

export async function logoutRequest() {
  try {
    const response = await api.post(ApiEndpoints.auth.logout)

    if (response.status >= 400) {
      throw response
    }

    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage = error.data?.message || error.message
    return { success: false, error: errorMessage }
  }
}