//service/carService.js
import axios from "axios";

const API_URL = "http://localhost:8080/cars";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const carService = {

    //GET
    //obtener autos aleatorios
  getRandomCars: async () => {
    try {
      const response = await axios.get(`${API_URL}/random`);
      return response.data;
    } catch (error) {
      console.error("Error fetching random cars:", error);
      throw error.response?.data || "Error al obtener autos aleatorios";
    }
  },

  getAllCars: async () => {
    try {
      const response = await axios.get(`${API_URL}/modelos`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all cars:", error);
      throw error.response?.data || "Error al obtener todos los autos";
    }
  },

  //obtener auto por ID
  getCarById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching car with ID ${id}:`, error);
      throw error.response?.data || "Error al obtener el auto";
    }
  },

  //Crear un nuevo auto (POST)
  createCar: async (carData) => {
    try {
      const response = await axios.post(API_URL, carData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating car:", error);
      throw error.response?.data || "Error al añadir auto";
    }
  },

  //Actualizar auto (PUT)
  updateCar: async (id, carData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, carData, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating car with ID ${id}:`, error);
      throw error.response?.data || "Error al actualizar auto";
    }
  },

  // 6. Eliminar auto por ID (DELETE)
  deleteCar: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
      throw error.response?.data || "Error al eliminar auto";
    }
  },
}
