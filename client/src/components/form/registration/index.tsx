
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { RegistrationFormData, registrationFormSchema } from "./schema"
import { createUser } from "@/lib/api/user"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth/auth-context"
import { useNavigate } from "react-router"

function RegistrationForm() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema)
  })

  async function onSubmit(values: RegistrationFormData) {
    const { username, email, password } = values

    const userResponse = await createUser({
      username,
      email,
      password
    })

    if (!userResponse.success) {
      toast("Failed to create account", { description: userResponse.error })
      form.setValue("username", "")
      form.setValue("email", "")
      return
    }

    const loginSuccess = await login(email, password)

    if (!loginSuccess) {
      toast("Account created sucessfully, try loggin in.")
    }

    navigate("/dashboard")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting} type="submit">Sign up</Button>
      </form>
    </Form>
  )
}

export default RegistrationForm