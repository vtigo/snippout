import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/lib/auth/auth-context';
import { Link, Outlet, useLocation } from 'react-router';

function Layout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const headerlessRoutes = [""]

  const shouldRenderHeader = !headerlessRoutes.includes(location.pathname)

  return (
    <div className="app-container">
      {shouldRenderHeader && (
        <header className='fixed w-full h-16 border-b'>
          <Container className='flex h-full items-center justify-between'>
            <Link className='text-primary font-bold' to="/">Snippout</Link>

            {!isAuthenticated && (
              <Button>
                <Link to="/auth">Login / Register</Link>
              </Button>
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