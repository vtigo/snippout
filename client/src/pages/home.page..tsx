import { Button } from "@/components/ui/button"

function HomePage() {
  return (
    <section id="home">
      <div className="flex flex-col gap-4 justify-center h-screen items-center bg-zinc-800">
        <h1 className="text-zinc-50 text-4xl">Welcome to Snippout</h1>
        <Button onClick={() => console.log("oi")}>Log in</Button>
      </div>
    </section>
  )
}

export default HomePage