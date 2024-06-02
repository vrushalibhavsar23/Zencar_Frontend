import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    mobile_no: '',
    date_of_birth: '', 
    location: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/employees/register/', formData)
      .then(response => {
        alert('Registration successful! Please login.'); 
        setError('');
        setFormData({ 
          username: '',
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          mobile_no: '',
          date_of_birth: '',
          location: '',
        });
      })
      .catch(() => setError('Registration failed. Please try again.'));
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key.replace('_', ' ').toUpperCase()}:</label>
            {key === 'date_of_birth' ? ( 
              <input
                type="date"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
      <button className="back-button" onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  );
}

export default RegistrationForm;
