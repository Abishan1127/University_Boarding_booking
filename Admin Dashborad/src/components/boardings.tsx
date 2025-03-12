import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Boarding.css";

// Boardings Interface
interface Boardings {
  [x: string]: ReactNode;
  board_id: number;
  uni_id: number;
  board_name: string;
  board_Address: string;
  board_contactnumber: string;
  board_image: string;
}

const Boardings: React.FC = () => {
  const [boardings, setboardings] = useState<Boardings[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [BoardingsIdToDelete, setBoardingsIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/boarding/get")
      .then((response) => {
        setboardings(response.data);
      })
      .catch((error) => console.error("Error fetching boardings:", error));
  }, []);

  const handleDelete = (id: number) => {
    setBoardingsIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (BoardingsIdToDelete !== null) {
      axios
        .delete(`http://localhost:5000/api/boarding/${BoardingsIdToDelete}`)
        .then(() => {
          setboardings((prev) => prev.filter((uni) => uni.uni_id !== BoardingsIdToDelete));
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Error deleting Boardings:", error);
          setShowModal(false);
        });
    }
  };

  return (
    <div className="container">
      <h2>Boardings List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Actions</th>
            <th>Uni ID</th>
          </tr>
        </thead>
        <tbody>
          {boardings.map((board) => (
            <tr key={board.board_id}>
              <td>{board.board_id}</td>
              <td>{board.board_name}</td>
              <td>{board.board_Address}</td>
              <td>{board.board_contact_number}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(board.board_id)}>Delete</button>
              </td>
              <td>{board.uni_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this Boardings?</h3>
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

export default Boardings;
