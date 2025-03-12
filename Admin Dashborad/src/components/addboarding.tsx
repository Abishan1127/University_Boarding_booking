import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddBoarding.css";

const AddBoarding: React.FC = () => {
  const [formData, setFormData] = useState({
    board_name: "",
    board_Address: "",
    board_contactnumber: "",
    uni_id: "",
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
    formDataToSend.append("board_name", formData.board_name);
    formDataToSend.append("board_Address", formData.board_Address);
    formDataToSend.append("board_contactnumber", formData.board_contactnumber);
    formDataToSend.append("uni_id", formData.uni_id);
    if (image) {
      formDataToSend.append("board_image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/boarding", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Boarding added successfully!");
      navigate("/boardings"); // Redirect back to the boarding list
    } catch (error) {
      console.error("Error adding boarding:", error);
    }
  };

  return (
    <div className="add-boarding-container">
      <h2>Add Boarding</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label>
        <input type="text" name="board_name" value={formData.board_name} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="board_Address" value={formData.board_Address} onChange={handleChange} required />

        <label>Contact Number:</label>
        <input type="text" name="board_contactnumber" value={formData.board_contactnumber} onChange={handleChange} required />

        <label>University ID:</label>
        <input type="text" name="uni_id" value={formData.uni_id} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />

        <button type="submit" className="submit-button">Add Boarding</button>
      </form>
    </div>
  );
};

export default AddBoarding;
