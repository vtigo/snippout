
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth/auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { categoryFormSchema, CategoryFormData } from "./schema"
import { toast } from "sonner"
import { createCategory } from "@/lib/api/category"

function CategoryForm() {
  const { user } = useAuth()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema)
  })

  async function onSubmit(values: CategoryFormData) {
    if (!user) return

    const { name, description, color } = values

    const categoryResponse = await createCategory({
      name,
      description,
      color,
      user: user.id
    })

    if (!categoryResponse.success) {
      toast.error("Failed to create category", { description: categoryResponse.error })
      return
    }

    toast.success("Category created successfully")
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Your category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Description</FormLabel>
              <FormControl>
                <Input placeholder="A description for your category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input type="color"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">Create</Button>
      </form>
    </Form>
  )
}

export default CategoryForm