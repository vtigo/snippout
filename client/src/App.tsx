import Layout from "@/components/layout"
import { AuthProvider } from "@/lib/auth/auth-context"
import AuthPage from "@/pages/auth.page"
import HomePage from "@/pages/home.page"
import { BrowserRouter, Route, Routes } from "react-router"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </AuthProvider>
  )
}

export default App
