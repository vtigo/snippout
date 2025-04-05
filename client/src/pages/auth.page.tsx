import LoginForm from "@/components/form/login";
import RegistrationForm from "@/components/form/registration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AuthPage() {

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
      </Card>
    )
  };

  return (
    <section id="auth" className="flex justify-center pt-24 w-full min-h-screen">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl">Welcome to Snippout</h1>

          <Tabs defaultValue="register" className="w-full max-w-2xl">
            <TabsList className="w-full">
              <TabsTrigger value="login">Sign in</TabsTrigger>
              <TabsTrigger value="register">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">{formComponents["login"]}</TabsContent>
            <TabsContent value="register">{formComponents["register"]}</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default AuthPage