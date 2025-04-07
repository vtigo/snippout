import Layout from "@/components/layout"
import { ProtectedRoute, PreAuthRoute } from "@/components/protected-route"
import { AuthProvider } from "@/lib/auth/auth-context"
import AuthPage from "@/pages/auth.page"
import DashboardPage from "@/pages/dashboard.page"
import HomePage from "@/pages/home.page"
import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/providers/theme-provider"
import CategoryPage from "./pages/category.page"
import { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<HomePage />} />

                <Route path="/auth" element={
                  <PreAuthRoute>
                    <AuthPage />
                  </PreAuthRoute>
                } />

                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />

                <Route path="/categories" element={
                  <ProtectedRoute>
                    <CategoryPage />
                  </ProtectedRoute>
                } />

              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
