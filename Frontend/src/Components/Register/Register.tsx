import { useState } from "react";
import axios from "axios";
import "./Register.css";
import registerim from "../../assets/login-banner.jpeg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validatePassword = (password: string) => {
    return password.length >= 6 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("❌ Password must be at least 6 characters long, contain a number and a special character!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register", 
        formData,
        { withCredentials: true } // ✅ Allow cookies
      );

      if (response.data.success) {
        setSuccess("✅ Registration successful! You can now log in.");
        setFormData({ 
          name: "",
          contactNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
      } else {
        setError(response.data.message || "❌ Registration failed.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "❌ Error registering user. Please try again.");
    } finally {
      setLoading(false); // ✅ Stop loading after response
    }
  };

  return (
    <div className="register-container">
      <img src={registerim} alt="" className="registerim"/>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          placeholder="Your Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

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

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label>I agree to Terms and Conditions</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
