import { useNavigate, useLocation } from 'react-router-dom';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { canInstall, promptInstall } = useInstallPrompt();

  const showBack = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <nav className="navbar">
      <div className="navbar__left">
        {showBack && (
          <button className="navbar__back" onClick={() => navigate(-1)}>
            ←
          </button>
        )}
      </div>

      <div className="navbar__brand" onClick={() => navigate('/')}>
        <div className="navbar__logo">A</div>
        <span className="navbar__title">ARKA</span>
      </div>

      <div className="navbar__actions">
        {canInstall && (
          <button className="navbar__install-btn" onClick={promptInstall}>
            Install App
          </button>
        )}
      </div>
    </nav>
  );
}
