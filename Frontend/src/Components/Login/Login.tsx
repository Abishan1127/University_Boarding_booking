import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import imlogin from "../../assets/login-banner.jpeg"

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
        const response = await axios.post("http://localhost:5000/api/users/login", formData, {
            withCredentials: true, // ✅ Include Cookies
        });

        if (response.status === 200) {
            alert("Login successful!");
            navigate("/");
        } else {
            setError("Invalid email or password.");
        }
    } catch (err) {
        setError("Login failed. Please try again.");
    }
};


  return (
    <div className="login-container">
      <img src={imlogin} alt="" className="banner" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
