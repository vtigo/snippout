import LoginForm from "@/components/form/login";
import RegistrationForm from "@/components/form/registration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useState } from "react";

function AuthPage() {
  const [formType, setFormType] = useState<"register" | "login">("register")

  const handleSwitchToLogin = useCallback(() => setFormType("login"), []);
  const handleSwitchToRegister = useCallback(() => setFormType("register"), []);

  const formComponents = {
    register: (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Create your account to start using the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm">Already have an account? <Button onClick={handleSwitchToLogin} variant="link">sign in</Button></p>
        </CardFooter>
      </Card>
    ),
    login: (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Login to get back to your snippets</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm">Dont have an account? <Button onClick={handleSwitchToRegister} variant="link">sign up</Button></p>
        </CardFooter>
      </Card>
    )
  };

  return (
    <section id="auth" className="flex justify-center items-center w-full min-h-screen">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-12 items-center">
          <h1 className="text-2xl">Welcome to Snippout</h1>
          {formComponents[formType]}
        </div>
      </div>
    </section>
  );
}

export default AuthPage