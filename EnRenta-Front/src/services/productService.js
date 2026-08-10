//service/productService.js
import axios from "axios";

const API = "http://localhost:8080/cars";

//POST
export const createCar = async (carData) => {
    try {
        const res = await axios.post(API, carData);
        return res.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error.response?.data || "Error al añadir auto";
    }
}

//GET

export const getAllCars = async () => {
    const res = await axios.get(API + "/modelos");
    return res.data;
}

//Devuelve liste de 3 autos random
export const getRandomCars = async () => {
  const res = await axios.get(API + "/random");
  return res.data;
};

export const getCarById = async (id) => {
    const res = await axios.get(
        `/${API}/${id}`
    );
    return res.data;       
};

//PUT


//DELETE

export const deleteCarById = async (id) => {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
};
