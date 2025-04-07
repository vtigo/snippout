import Layout from "@/components/layout"
import { PreAuthRoute, ProtectedRoute } from "@/components/protected-route"
import AuthPage from "@/pages/auth.page"
import DashboardPage from "@/pages/dashboard.page"
import HomePage from "@/pages/home.page"
import { BrowserRouter, Route, Routes } from "react-router"
import Providers from "./components/providers"
import CategoryPage from "./pages/category.page"

function App() {
  return (
    <Providers>
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
    </Providers>
  )
}

export default App
