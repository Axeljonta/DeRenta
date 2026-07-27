import { use } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {getCarById} from "../services/productService";

export const useCarById = () => {
    
    const {id} = useParams(); 

    const [car, setCar] = useState(null);
    
    useEffect(() => {

        const fetchCar = async () => {

            try {
                const data = await getCarById(id); 
                
                
                setCar(data);
                } 
            catch (error) {
                console.error("Error fetching car data:", error);
                }
        }
        fetchCar();
    }, [id]);

    console.log(car);
    
    return car;
};
