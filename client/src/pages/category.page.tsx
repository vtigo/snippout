import CategoryForm from "@/components/form/category"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function CategoryPage() {

  return (
    <section className="py-24">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>New Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Category</DialogTitle>
                <DialogDescription>
                  Create a new category to organize your snippets.
                </DialogDescription>
              </DialogHeader>
              <CategoryForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4">
          
        </div>

      </div>
    </section>
  )
}

export default CategoryPage
