import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import { saveProfile } from '../services/mockApi';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    deliveryZone: '',
    platforms: [],
    monthlyIncome: '',
    workingHours: '',
    upiId: ''
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveProfile(formData);
      updateProfile(formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="profile-page">
        <FormContainer title="Complete Profile" subtitle="Help us tailor your parametric protection">
          <InputField
            label="City"
            type="select"
            options={['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune']}
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          <InputField
            label="Delivery Platforms"
            type="chips"
            multiple
            options={['Swiggy', 'Zomato', 'Zepto', 'Blinkit', 'Dunzo']}
            value={formData.platforms}
            onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
          />
          <InputField
            label="Avg. Monthly Income (₹)"
            type="number"
            placeholder="25000"
            value={formData.monthlyIncome}
            onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
          />
          <InputField
            label="UPI ID"
            placeholder="name@upi"
            value={formData.upiId}
            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
          />
          <Button onClick={handleSubmit} loading={loading}>Save Profile</Button>
        </FormContainer>
      </div>
    </PageTransition>
  );
}
