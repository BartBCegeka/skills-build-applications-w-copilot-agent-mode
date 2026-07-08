import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function AppLayout() {
  return (
    <>
      <header className="border-bottom bg-light">
        <div className="container py-3 d-flex flex-wrap align-items-center gap-3">
          <h1 className="h4 m-0">OctoFit Tracker</h1>
          <nav className="d-flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
