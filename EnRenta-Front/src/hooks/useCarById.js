import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {carService} from "../services/carService";

export const useCarById = () => {
    
    const {id} = useParams();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Si no hay ID, no hacer nada

        const fetchCar = async () => {
            try {
                const data = await carService.getCarById(id); 
                setCar(data);
            } catch (err) {
                console.error("Error fetching car data:", error);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);
    return { car, loading, error };
};
