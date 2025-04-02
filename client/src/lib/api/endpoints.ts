const ApiEndpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    check: "/auth/check"
  },
  user: {
    getAll: "/user",
    getById: (id: string) => `/user/${id}`,
    create: "/user",
    update: (id: string) => `/user/${id}`,
    delete: (id: string) => `/user/${id}`,
  }
}

export default ApiEndpoints
export type ApiEndpointsType = typeof ApiEndpoints