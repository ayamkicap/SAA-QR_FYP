import axios from 'axios';

const baseURL = 'http://localhost:3500'; // Update the base URL according to your API endpoint

const logService = axios.create({
  baseURL,
});

export const getLogs = async () => {
  try {
    const response = await logService.get('/logs/mongo');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can add more API functions here for other CRUD operations if needed

export default logService;
