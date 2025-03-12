import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddRoom.css";

const AddRoom: React.FC = () => {
  const [formData, setFormData] = useState({
    board_id: "",
    start_date: "",
    end_date: "",
  });

  const navigate = useNavigate();

  // Handle text input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/room/add", formData);
      alert("Room added successfully!");
      navigate("/rooms"); // Redirect back to the room list
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <div className="add-room-container">
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <label>Board ID:</label>
        <input type="text" name="board_id" value={formData.board_id} onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />

        <button type="submit" className="submit-button">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
