import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
        const navigate = useNavigate();
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
    
        console.log(JSON.stringify(loginData));
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json", 
            },
            body: JSON.stringify(loginData),
            credentials: 'include', 
          });
    
          const data = await response.json();
          if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', data.token);
            navigate('/course')
          } else {
            if (data.errors) {
                const errorMessages = [];
                for (let field in data.errors) {
                    errorMessages.push(`${field}: ${data.errors[field].join(', ')}`);
                }
                setError(<ul>{errorMessages.map((msg, index) => <li key={index}>{msg}</li>)}</ul>);
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
          }
        } catch (error) {
          setError('An error occurred. Please try again.');
          console.error('Error:', error);
        }
    
        setLoading(false);
      };
    
      return (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
        
      );
}

export default LoginPage;
