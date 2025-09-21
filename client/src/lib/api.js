// Simple API helper that attaches Clerk auth token to requests
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

// Base URL for your Express API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useApi() {
  const { getToken } = useAuth();

  const request = async (method, path, data) => {
    const token = await getToken();
    const res = await axios({
      method,
      url: `${API_BASE_URL}${path}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  return {
    get: (path) => request('get', path),
    post: (path, data) => request('post', path, data),
    put: (path, data) => request('put', path, data),
    del: (path) => request('delete', path),
  };
}