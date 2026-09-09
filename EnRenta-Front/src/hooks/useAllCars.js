import { useEffect, useState } from "react";
import { carService } from "../services/carService";

export const useAllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getAllCars();
        setCars(data);
      } catch (err) {
        console.error("Error fetching all cars:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, loading, error, setCars };
};