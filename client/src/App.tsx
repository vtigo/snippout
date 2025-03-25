import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "@/components/layout"
import HomePage from "@/pages/home.page"
import AuthPage from "./pages/auth.page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
