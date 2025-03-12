import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/send-email", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", title: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Have Questions? <span>We're Here To Help!</span></h2>
      <p>
        Have questions or need help? Simply fill out the form below, and we'll get back
        to you within 24 hours.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="message" placeholder="Comments" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">SEND</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default Contact;
