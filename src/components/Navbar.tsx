import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Contract Manager</span>
      </div>

      <div className="navbar-right">
        <button
          className="nav-btn"
          onClick={() => navigate('/')}
        >
          Builder
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
}
