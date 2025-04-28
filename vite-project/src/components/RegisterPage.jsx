import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/home');
    }
  }, []);

  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    mobiles: [''],
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e, index = null) => {
    if (e.target.name === 'mobiles') {
      const updatedMobiles = [...formData.mobiles];
      updatedMobiles[index] = e.target.value;
      setFormData({ ...formData, mobiles: updatedMobiles });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addMobileField = () => {
    setFormData({ ...formData, mobiles: [...formData.mobiles, ''] });
  };

  const validateForm = () => {
    const { firstName, lastName, email, mobiles, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) return false;
    if (password !== confirmPassword) return false;
    if (mobiles.some(mob => !mob)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill all fields correctly.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === formData.email);
    if (userExists) {
      alert('User already registered.');
      return;
    }
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(formData));
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" className="form-control mb-2" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
        {formData.mobiles.map((mobile, index) => (
          <input
            key={index}
            type="text"
            name="mobiles"
            placeholder="Mobile Number"
            className="form-control mb-2"
            value={mobile}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
        <button type="button" onClick={addMobileField} className="btn btn-secondary mb-2">Add More</button>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="form-control mb-2"
          onChange={handleChange}
        />
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label">Show Password</label>
        </div>
        <button type="submit" className="btn btn-primary me-2">Register</button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Go Back</button>
      </form>
    </div>
  );
};

export default RegisterPage;