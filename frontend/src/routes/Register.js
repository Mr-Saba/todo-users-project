import React, { useContext, useState } from 'react';
import { registerUser } from '../api/api.js'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext.js';

function Register() {

  const {setUserData} = useContext(UserContext)

  const [registerInfo, SetRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword:''
  });

  const navigate = useNavigate()

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e) => {
    SetRegisterInfo((p) => ({
      ...p,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
  
    if (registerInfo.password !== registerInfo.confirmPassword) {
      alert('passwords dont match');
      return;
    }
  
    try {
      const response = await registerUser(
        registerInfo.username, 
        registerInfo.email, 
        registerInfo.password, 
        registerInfo.confirmPassword
      );
  
      if (response.data) {
        setSuccessMessage('Registration successful!');
        setUserData(response.data);

        navigate('/');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };
  

  return (
    <div>
      <form className="form" onSubmit={handleRegisterFormSubmit}>
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}

        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={registerInfo.username}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter email..."
          value={registerInfo.email}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={registerInfo.password}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password..."
          value={registerInfo.confirmPassword}
          onChange={handleFormChange}
        />
        <a href='/login'>already logged in?</a>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
