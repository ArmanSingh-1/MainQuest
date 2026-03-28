import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import './HomePage.css';

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="home-page">
        <div className="home-page__greeting">
          <div className="home-page__avatar">{user?.contact?.[0]?.toUpperCase() || 'U'}</div>
          <h1 className="home-page__name">Hello, {user?.contact || 'Partner'}</h1>
          <p className="home-page__subtitle">Welcome to your ARKA Dashboard</p>
        </div>

        {!user?.profileCompleted && (
          <div className="home-page__banner" onClick={() => navigate('/profile')}>
            <span className="home-page__banner-text">Complete your profile to activate protection →</span>
          </div>
        )}

        <div className="home-page__cards">
          <div className="home-page__card">
            <span className="home-page__card-icon">🏥</span>
            <div>
              <div className="home-page__card-label">Protection Status</div>
              <div className="home-page__card-value">{user?.profileCompleted ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
          <div className="home-page__card">
            <span className="home-page__card-icon">⛈️</span>
            <div>
              <div className="home-page__card-label">Weather Alerts</div>
              <div className="home-page__card-value">No severe alerts in Mumbai</div>
            </div>
          </div>
        </div>

        <div className="home-page__actions">
          <Button variant="secondary" onClick={() => navigate('/profile')}>Edit Profile</Button>
          <Button variant="danger" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
        </div>
      </div>
    </PageTransition>
  );
}
