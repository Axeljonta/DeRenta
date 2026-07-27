import { useRandomCars } from "../../hooks/useRandomCars";
import { CarCard } from "../CarCard/CarCard";

import "./HomeRecommendations.css";

export const HomeRecommendations = () => {

  const { cars, loading } = useRandomCars(); 
  

  if (loading) {
    return <p>Cargando autos...</p>;
  }
  console.log(cars);
  
  return (
    <section className="recommendations">

      {cars.map((car) => (
        <CarCard 
          key={car.id}
          car={car}
        />
      ))}

    </section>
  );
};