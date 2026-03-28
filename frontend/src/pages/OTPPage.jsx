import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import { verifyOtp, sendOtp } from '../services/mockApi';
import './OTPPage.css';

export default function OTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const contact = location.state?.contact;
  useEffect(() => { if (!contact) navigate('/login'); }, [contact, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await verifyOtp(contact, otp.join(''));
      login(res.user);
      navigate(res.user.profileCompleted ? '/' : '/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="otp-page">
        <FormContainer title="Verify OTP" subtitle={`Code sent to ${contact}`}>
          <div className="otp-page__inputs">
            {otp.map((d, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                className="otp-page__digit"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                maxLength={1}
              />
            ))}
          </div>
          {error && <div className="otp-page__error">{error}</div>}
          <Button onClick={handleVerify} loading={loading} disabled={otp.join('').length < 6}>Verify OTP</Button>
        </FormContainer>
      </div>
    </PageTransition>
  );
}
