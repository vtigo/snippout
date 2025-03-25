import { Link, Outlet, useLocation } from 'react-router';

function Layout() {
  const location = useLocation()

  const headerlessRoutes = ["/", "/auth"]

  const shouldRenderHeader = !headerlessRoutes.includes(location.pathname)

  return (
    <div className="app-container">
      {shouldRenderHeader && <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </header>}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;