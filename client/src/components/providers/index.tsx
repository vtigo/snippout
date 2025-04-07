import { AuthProvider } from "@/lib/auth/auth-context"
import { ThemeProvider } from "./theme-provider"
import QueryProvider from "./query-provider"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default Providers