import { Link, Outlet, useLocation } from 'react-router';
import { Button } from './ui/button';
import { useAuth } from '@/lib/auth/auth-context';
import { Container } from './container';

function Layout() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const headerlessRoutes = ["/", "/auth"]

  // const shouldRenderHeader = !headerlessRoutes.includes(location.pathname)
  const shouldRenderHeader = true

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
    </div>
  );
}

export default Layout;