import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddUniversity.css";

const AddUniversity: React.FC = () => {
  const [formData, setFormData] = useState({
    uni_name: "",
    uni_Address: "",
    uni_contact_number: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("uni_name", formData.uni_name);
    formDataToSend.append("uni_Address", formData.uni_Address);
    formDataToSend.append("uni_contact_number", formData.uni_contact_number);
    if (image) {
      formDataToSend.append("uni_image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/universities", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("University added successfully!");
      navigate("/universities"); // Redirect back to the universities list
    } catch (error) {
      console.error("Error adding university:", error);
    }
  };

  return (
    <div className="add-university-container">
      <h2>Add University</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input type="text" name="uni_name" value={formData.uni_name} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="uni_Address" value={formData.uni_Address} onChange={handleChange} required />

        <label>Contact Number:</label>
        <input type="text" name="uni_contact_number" value={formData.uni_contact_number} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit" className="submit-button">Add University</button>
      </form>
    </div>
  );
};

export default AddUniversity;
