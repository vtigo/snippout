import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"
import { Link } from "react-router"

function HomePage() {
  const { isAuthenticated } = useAuth()
  return (
    <section id="home">
      <div className="flex flex-col gap-8 justify-center h-screen items-center">
        <h1 className="text-4xl">Welcome to Snippout</h1>

        {isAuthenticated ? (
          <Button>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <Button>
            <Link to="/auth">Login / Register</Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export default HomePage