import Layout from "@/components/layout"
import { ProtectedRoute, PreAuthRoute } from "@/components/protected-route"
import { AuthProvider } from "@/lib/auth/auth-context"
import AuthPage from "@/pages/auth.page"
import DashboardPage from "@/pages/dashboard.page"
import HomePage from "@/pages/home.page"
import { BrowserRouter, Route, Routes } from "react-router"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App