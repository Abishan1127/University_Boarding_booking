import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Event.css";  

interface Booking {
  [x: string]: ReactNode;
  id: number;
  booking_id: number;
  user_Id: number;
  board_Id: number;
  room_Id: number;
  start_date: string;
  end_date: string;
  payment_status: string;
  payment_method	: string;
  transaction_id	: string;
  amount: number;
  createdAt: string;
}

const Book: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Fetch bookings from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book")
      .then((response) => {
        // Sorting bookings by ID
        const sortedBookings = response.data.sort((a: Booking, b: Booking) => a.id - b.id);
        setBookings(sortedBookings);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Delete a booking
  const deleteBooking = async () => {
    if (itemToDelete !== null) {
      try {
        await axios.delete(`http://localhost:5000/api/bookdelete/${itemToDelete}`);
        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== itemToDelete));
        setShowConfirmDelete(false);
        setItemToDelete(null);
        alert("Booking deleted successfully");
      } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking");
      }
    }
  };

  // Request confirmation before deleting
  const requestDelete = (id: number) => {
    setItemToDelete(id);
    setShowConfirmDelete(true);
  };

  // Cancel delete action
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
            <th>Book-ID</th>
            <th>User-Id</th>
            <th>Board-Id</th>
            <th>Room-Id</th>
            <th>Start-Date</th>
            <th>End-Date</th>
            <th>Status</th>
            <th>Method</th>
            <th>Transaction-ID</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.booking_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.board_id}</td>
              <td>{booking.room_id}</td>
              <td>{booking.start_date	}</td>
              <td>{booking.end_date}</td>
              <td>{booking.payment_status}</td>
              <td>{booking.payment_method	}</td>
              <td>{booking.transaction_id	}</td>
              <td>{booking.amount}</td>
              <td>{booking.created_at	}</td>
              <td>
                <button className="delete-button" onClick={() => requestDelete(booking.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this booking?</h3>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={deleteBooking}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
