import { Button } from "@/components/ui/button"
import { Link } from "react-router"

function HomePage() {
  return (
    <section id="home">
      <div className="flex flex-col gap-12 justify-center h-screen items-center">
        <h1 className="text-4xl">Welcome to Snippout</h1>
        <Button>
          <Link to="/auth">Login / Register</Link>
        </Button>
      </div>
    </section>
  )
}

export default HomePage