import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import { sendOtp } from '../services/mockApi';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('phone');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    if (!contact) {
      setError(`Please enter your ${mode}`);
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(contact);
      setSuccess(res.message);
      setTimeout(() => navigate('/otp', { state: { contact, mode } }), 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="login-page">
        <div className="login-page__hero">
          <h1 className="login-page__hero-title">
            ARKA <span className="gradient-text">Insurance</span>
          </h1>
          <p className="login-page__hero-desc">
            The ultimate parametric protection for gig workers. Protect your income against rain, heatwaves, and disruptions with instant, paperwork-free payouts.
          </p>
          <div className="login-page__features">
            <div className="login-page__feature-card">
              <span className="login-page__feature-icon">⚡</span>
              <div>
                <h4 className="login-page__feature-title">Instant Payouts</h4>
                <p className="login-page__feature-text">Automated triggers ensures money hits your account instantly.</p>
              </div>
            </div>
            <div className="login-page__feature-card">
              <span className="login-page__feature-icon">🛡️</span>
              <div>
                <h4 className="login-page__feature-title">Parametric Cover</h4>
                <p className="login-page__feature-text">No manual claims. Verified weather data triggers your protection.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-page__form-section">
          <div className="login-page__form-wrapper">
            <div className="login-page__form-header">
              <h2 className="login-page__form-greeting">Aur karo login...</h2>
              <p className="login-page__form-authorized">Authorized partners only</p>
            </div>
            <FormContainer title="Partner Login" subtitle="Sign in to your ARKA account">
              <div className="login-page__toggle">
                <button className={`login-page__toggle-btn ${mode === 'phone' ? 'active' : ''}`} onClick={() => setMode('phone')}>Phone</button>
                <button className={`login-page__toggle-btn ${mode === 'email' ? 'active' : ''}`} onClick={() => setMode('email')}>Email</button>
              </div>
              {error && <div className="login-page__error">{error}</div>}
              {success && <div className="login-page__success">{success}</div>}
              <InputField
                label={mode === 'phone' ? 'Mobile Number' : 'Email Address'}
                type={mode === 'phone' ? 'tel' : 'email'}
                placeholder={mode === 'phone' ? '9876543210' : 'you@example.com'}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <Button onClick={handleSendOtp} loading={loading}>Send OTP</Button>
            </FormContainer>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
