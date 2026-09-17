import axios from "axios";

const API_URL = "http://localhost:8080/users";

// Configuración de headers por defecto para JSON
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const userService = {
  //Obtener todos los usuarios
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/allUsers`);
    return response.data;
  },

  //Obtener usuario por ID
  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  //Buscar usuario por Email
  getUserByEmail: async (email) => {
    const response = await axios.get(`${API_URL}/email?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  //Registrar nuevo usuario
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, config);
      return response.data;
    }catch (error) {
      if (error.response){
        if (error.response.status === 409) {
        throw "El usuario ya está registrado.";
        }
      }else if (error.response.data && typeof error.response.data === "string") {
          throw error.response.data;
        }
    }
  },

  //Login usuario
  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials, config);
      if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        throw "Correo electrónico o contraseña incorrectos";
      }
      throw "Error al conectar con el servidor. Intente más tarde.";
    }

  },

  //Obtener usuario logueado
  getLoggedInUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  //Cerrar sesión
  logoutUser: () => {
    localStorage.removeItem("user");
  },

  //Actualizar usuario
  updateUser: async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, config);
    return response.data;
  },

  //Cambiar Rol de usuario
  updateUserRole: async (id, newRole) => {
    const response = await axios.patch(`${API_URL}/${id}/role`, { role: newRole }, config);
    return response.data;
  },

  //Eliminar usuario
  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};