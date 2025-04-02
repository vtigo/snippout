import LoginForm from "@/components/form/login";
import RegistrationForm from "@/components/form/registration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

function AuthPage() {
  const [formType, setFormType] = useState<"register" | "login">("register")

  return (
    <section id="auth">
      <div className="flex flex-col gap-4 h-screen items-center bg-background py-12 px-6">
        <h1 className="text-2xl">Welcome to Snippout</h1>

        {formType === "register" && (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Create your account to start using the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <RegistrationForm />
            </CardContent>
            <CardFooter>
              <p>Already have an account? <Button onClick={() => setFormType("login")} variant="link">sign in</Button></p>
            </CardFooter>
          </Card>
        )}

        {formType === "login" && (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Login to get back to your snippets</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter>
              <p>Dont have an account? <Button onClick={() => setFormType("register")} variant="link">sign up</Button></p>
            </CardFooter>
          </Card>
        )}

      </div>
    </section>
  );
}

export default AuthPage