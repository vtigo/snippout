import CategoryForm from "@/components/form/category"
import { CategoryFormData } from "@/components/form/category/schema"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createCategory, deleteCategory, getAllCategories } from "@/lib/api/category"
import { useAuth } from "@/lib/auth/auth-context"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

function CategoryPage() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    enabled: !!user
  })

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setIsDialogOpen(false)
    },
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const handleCategorySubmit = (values: CategoryFormData) => {
    if (!user) return
    createCategoryMutation.mutate({
      ...values,
      user: user.id
    })
  }

  return (
    <section className="py-24">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Categories</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <CategoryForm onSubmit={handleCategorySubmit} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4">
          {categories?.map((category: any) => (
            <div key={category.id} className="flex justify-between items-center">
              <h2>{category.name}</h2>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      category and your snippets unbound.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCategoryMutation.mutate(category._id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategoryPage
