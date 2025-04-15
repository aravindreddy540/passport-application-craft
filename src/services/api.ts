
import axios from 'axios';
import { DS160FormData } from '@/context/FormContext';

const API_URL = 'http://localhost:5000/api';

// Type for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Type for application data with ID and status
interface Application extends DS160FormData {
  _id: string;
  formStatus: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

const api = {
  // Get all applications
  getAllApplications: async (): Promise<Application[]> => {
    try {
      const response = await axios.get<ApiResponse<Application[]>>(`${API_URL}/applications`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },
  
  // Get application by ID
  getApplication: async (id: string): Promise<Application> => {
    try {
      const response = await axios.get<ApiResponse<Application>>(`${API_URL}/applications/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      throw error;
    }
  },
  
  // Create new application
  createApplication: async (data: Partial<DS160FormData> & { formStatus?: 'draft' | 'submitted' | 'approved' | 'rejected' }): Promise<Application> => {
    try {
      const response = await axios.post<ApiResponse<Application>>(`${API_URL}/applications`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },
  
  // Update application
  updateApplication: async (id: string, data: Partial<DS160FormData> & { formStatus?: 'draft' | 'submitted' | 'approved' | 'rejected' }): Promise<Application> => {
    try {
      const response = await axios.put<ApiResponse<Application>>(`${API_URL}/applications/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating application ${id}:`, error);
      throw error;
    }
  },
  
  // Delete application
  deleteApplication: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.delete<ApiResponse<{ success: boolean; message: string }>>(`${API_URL}/applications/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting application ${id}:`, error);
      throw error;
    }
  }
};

export default api;
