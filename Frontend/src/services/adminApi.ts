import axios from 'axios';

const API_URL = 'http://localhost:5000/admin';

export const getBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
};