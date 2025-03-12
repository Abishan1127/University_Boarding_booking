import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Room.css";  

interface Room {
  room_id : number;
  board_id: number;
  user_id : number;
  start_date : string;
  end_date : string;
  booking_id : number;
}

const Room: React.FC = () => {
  const [Rooms, setRooms] = useState<Room[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<{ room_id : number } | null>(null);

  // Get Rooms
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/room/all")
      .then((response) => {
        // Rooms order
        const sortedRooms = response.data.sort((a: Room, b: Room) => a.room_id  - b.room_id );
        setRooms(sortedRooms);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Delete a Room
  const deleteRoom = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/roomsdelete/${itemToDelete.room_id }`);
        setRooms((prevRooms) => prevRooms.filter((Room) => Room.room_id  !== itemToDelete.room_id ));
        setShowConfirmDelete(false);
        setItemToDelete(null);
        alert("Room deleted successfully");
      } catch (error) {
        console.error("Error deleting Room:", error);
        alert("Error deleting Room");
        setShowConfirmDelete(false);
      }
    }
  };

  const requestDelete = (room_id : number) => {
    setItemToDelete({ room_id  });
    setShowConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  return (
    <div className="content">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>room_id </th>
            <th>board_id</th>
            <th>user_id</th>
            <th>start_date</th>
            <th>end_date</th>
            <th>booking_id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Rooms.map((Room) => (
            <tr key={Room.room_id }>
              <td>{Room.room_id }</td>
              <td>{Room.board_id}</td>
              <td>{Room.user_id}</td>
              <td>{Room.start_date}</td>
              <td>{Room.end_date}</td>
            
              <td>
                <button className="delete-button" onClick={() => requestDelete(Room.room_id )}>
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
            <h3>Are you sure you want to delete this Room?</h3>
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
