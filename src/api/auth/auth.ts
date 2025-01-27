import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
