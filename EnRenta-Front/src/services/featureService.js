import axios from 'axios';

// Ajustá la URL al puerto y ruta que use tu backend
const API_URL = 'http://localhost:8080/features';

export const featureService = {
  // Obtener todas las características
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Obtener una por ID
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Crear una nueva característica
  create: async (featureData) => {
    const response = await axios.post(API_URL, featureData);
    return response.data;
  },

  // Actualizar una existente
  update: async (id, featureData) => {
    const response = await axios.put(`${API_URL}/${id}`, featureData);
    return response.data;
  },

  // Eliminar una característica
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};