import { Container } from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/lib/auth/auth-context';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';

function Layout() {
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  const headerlessRoutes = [""]

  const shouldRenderHeader = !headerlessRoutes.includes(location.pathname)

  const isCurrentRoute = (route: string) => location.pathname.includes(route)

  return (
    <div className="app-container">
      {shouldRenderHeader && (
        <header className='fixed w-full h-16 border-b'>
          <Container className='flex h-full items-center justify-between'>
            <Link className='text-primary font-bold' to="/">Snippout</Link>

            {!isAuthenticated ? (
              <Button>
                <Link to="/auth">Login / Register</Link>
              </Button>
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <Link className={`${isCurrentRoute("dashboard") && "text-primary"} font-medium`} to="/dashboard">Dashboard</Link>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className='cursor-pointer'>
                      <AvatarImage src="" />
                      <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem disabled>
                        <User />
                        <span>Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Settings />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </Container>
        </header>
      )}

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>

      <Toaster />
    </div>
  );
}

export default Layout;