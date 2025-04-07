import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/auth-context";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <section className="py-24">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.username}!</CardTitle>
            <CardDescription>Your personal snippet dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is your dashboard where you can manage all your code snippets.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Total Snippets</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Recent Activities</div>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Snippets</CardTitle>
            <CardDescription>Your recently added or modified snippets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You don't have any snippets yet.</p>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}

export default DashboardPage;
