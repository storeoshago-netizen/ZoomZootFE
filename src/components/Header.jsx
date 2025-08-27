import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1rem 0'
        }}>
            <div className="container">
                <nav className="flex justify-between items-center">
                    {/* Logo */}
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        ZoomZoot
                    </div>

                    {/* Navigation Links */}
                    <div className="flex gap-6">
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                textDecoration: 'none',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/explore"
                            style={({ isActive }) => ({
                                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                textDecoration: 'none',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Explore
                        </NavLink>
                        <NavLink
                            to="/trips"
                            style={({ isActive }) => ({
                                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                textDecoration: 'none',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Trips
                        </NavLink>
                        <NavLink
                            to="/settings"
                            style={({ isActive }) => ({
                                color: isActive ? 'white' : 'rgba(255, 255, 255, 0.8)',
                                textDecoration: 'none',
                                fontWeight: isActive ? '600' : '400',
                                transition: 'all 0.3s ease'
                            })}
                        >
                            Settings
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;