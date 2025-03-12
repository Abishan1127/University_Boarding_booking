const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "yourdatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create a new booking
router.post("/", async (req, res) => {
  const { user_id, board_id, room_id, start_date, end_date, amount, payment_status } = req.body;

  if (!user_id || !board_id || !room_id || !start_date || !end_date || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await pool.query(
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
    const [bookings] = await pool.query("SELECT * FROM booking");
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
    const [booking] = await pool.query("SELECT * FROM booking WHERE booking_id = ?", [id]);
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
    await pool.query("UPDATE booking SET payment_status = ? WHERE booking_id = ?", [payment_status, id]);
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
    await pool.query("DELETE FROM booking WHERE booking_id = ?", [id]);
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
