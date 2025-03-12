const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Create a new booking
router.post("/", async (req, res) => {
  const { user_id, board_id, room_id, start_date, end_date, amount, payment_status } = req.body;

  if (!user_id || !board_id || !room_id || !start_date || !end_date || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO booking (user_id, board_id, room_id, start_date, end_date, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, board_id, room_id, start_date, end_date, amount, payment_status]
    );

    res.status(201).json({ message: "Booking created", bookingId: result.insertId });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const [bookings] = await db.query("SELECT * FROM booking");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get booking by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [booking] = await db.query("SELECT * FROM booking WHERE booking_id = ?", [id]);
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update booking payment status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;

  try {
    await db.query("UPDATE booking SET payment_status = ? WHERE booking_id = ?", [payment_status, id]);
    res.status(200).json({ message: "Booking updated" });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete booking
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM booking WHERE booking_id = ?", [id]);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
