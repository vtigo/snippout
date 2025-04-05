import Layout from "@/components/layout"
import ProtectedRoute from "@/components/protected-route"
import { AuthProvider } from "@/lib/auth/auth-context"
import AuthPage from "@/pages/auth.page"
import DashboardPage from "@/pages/dashboard.page"
import HomePage from "@/pages/home.page"
import { BrowserRouter, Route, Routes } from "react-router"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

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
  )
}

export default App