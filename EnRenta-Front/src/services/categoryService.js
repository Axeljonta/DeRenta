import axios from "axios";

const API_URL = "http://localhost:8080/categories";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const categoryService = {
  // GET: obtener todas las categorías
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error.response?.data || "Error al obtener las categorías";
    }
  },

  // GET: obtener categoría por ID
  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error.response?.data || "Error al obtener la categoría";
    }
  },

  // POST: crear una nueva categoría
  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(API_URL, categoryData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error.response?.data || "Error al crear la categoría";
    }
  },

  // PUT: actualizar categoría
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoryData, config);
      return response.data;
    } catch (error) {
      console.error(`Error updating category with ID ${id}:`, error);
      throw error.response?.data || "Error al actualizar la categoría";
    }
  },

  // DELETE: eliminar categoría por ID
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw error.response?.data || "Error al eliminar la categoría";
    }
  },
};