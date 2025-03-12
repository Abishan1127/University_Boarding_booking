import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getBoardings = async () => {
    const response = await axios.get(`${API_URL}/boardings`);
    return response.data;
};