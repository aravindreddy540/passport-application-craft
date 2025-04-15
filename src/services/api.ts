
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
  // Get all applications
  getAllApplications: async () => {
    try {
      const response = await axios.get(`${API_URL}/applications`);
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },
  
  // Get application by ID
  getApplication: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw error;
    }
  },
  
  // Create new application
  createApplication: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/applications`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },
  
  // Update application
  updateApplication: async (id: string, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/applications/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating application ${id}:`, error);
      throw error;
    }
  },
  
  // Delete application
  deleteApplication: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting application ${id}:`, error);
      throw error;
    }
  }
};

export default api;
