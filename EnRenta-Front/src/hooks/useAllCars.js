import { useEffect, useState } from "react";
import { getAllCars } from "../services/productService";

export const useAllCars = () => {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();

  }, []);

  return { cars, loading };
};