import { useEffect, useState } from "react";
import { carService } from "../services/carService";

export const useRandomCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getRandomCars();
        setCars(data);
      } catch (err) {
        console.error("Error en useRandomCars:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading, error };
};