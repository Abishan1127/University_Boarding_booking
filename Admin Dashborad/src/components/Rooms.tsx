import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Room.css";  

interface Room {
  room_id: number;
  board_id: number;
  user_id?: number;
  start_date: string;
  end_date: string;
  booking_id?: number;
}

const Room: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{ room_id: number } | null>(null);
  const navigate = useNavigate(); // For navigation

  // Get Rooms
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/room/all")
      .then((response) => {
        const sortedRooms = response.data.sort((a: Room, b: Room) => a.room_id - b.room_id);
        setRooms(sortedRooms);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Delete a Room
  const deleteRoom = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/roomsdelete/${itemToDelete.room_id}`);
        setRooms((prevRooms) => prevRooms.filter((room) => room.room_id !== itemToDelete.room_id));
        setShowConfirmDelete(false);
        setItemToDelete(null);
        alert("Room deleted successfully");
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Error deleting room");
      }
    }
  };

  const requestDelete = (room_id: number) => {
    setItemToDelete({ room_id });
    setShowConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  return (
    <div className="content">
      <div className="header">
        <h2>Room List</h2>
        <button className="add-room-button" onClick={() => navigate("/addroom")}>
          + Add Room
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Board ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.board_id}</td>
              <td>{room.start_date}</td>
              <td>{room.end_date}</td>
              <td>
                <button className="delete-button" onClick={() => requestDelete(room.room_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this room?</h3>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={deleteRoom}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
