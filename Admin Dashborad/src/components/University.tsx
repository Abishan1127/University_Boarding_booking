import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import "../styles/University.css";

// University Interface
interface University {
  [x: string]: ReactNode;
  uni_id: number;
  uni_name: string;
  uni_Address: string;
  uni_contactnumber: string;
  uni_image: string;
}

const University: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [universityIdToDelete, setUniversityIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/universities")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => console.error("Error fetching universities:", error));
  }, []);

  const handleDelete = (id: number) => {
    setUniversityIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (universityIdToDelete !== null) {
      axios
        .delete(`http://localhost:5000/api/universities/${universityIdToDelete}`)
        .then(() => {
          setUniversities((prev) => prev.filter((uni) => uni.uni_id !== universityIdToDelete));
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error deleting university:", error);
          setShowModal(false);
        });
    }
  };

  return (
    <div className="container">
      <h2>University List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni) => (
            <tr key={uni.uni_id}>
              <td>{uni.uni_id}</td>
              <td>{uni.uni_name}</td>
              <td>{uni.uni_Address}</td>
              <td>{uni.uni_contact_number}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(uni.uni_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this university?</h3>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-button confirm" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default University;
