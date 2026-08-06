import {useAllCars} from "../../hooks/useAllCars";
import { CarCard } from "../../components/CarCard/CarCard";
import { useState } from "react";
import { Pagination } from "../../components/Pagination/Pagination.jsx";
import "./Modelos.css";

function Modelos() {
  //recuperamos array de autos
  const { cars, loading } = useAllCars();
  //estado para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  //estado para la cantidad de autos por pagina
  const [carsQuantity, setCarsQuantity] = useState(3);

  //calculo paginacion
  const totalItems = cars ? cars.length : 0;
  const totalPages = Math.ceil(totalItems / carsQuantity);

  //calculo primer y ultimo auto a mostrar en la pagina actual
  const indexOfLastCar = currentPage * carsQuantity;
  const indexOfFirstCar = indexOfLastCar - carsQuantity;
  
  //calculo de los autos a mostrar en la pagina actual
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  //funcion para cambiar de pagina
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({top: 0, behavior: "smooth"}); // scroll al top de la pagina
    }

  };

  if (loading) {
    return <p>Cargando autos...</p>;
  }

  return (
    <div className="modelos">
      <div>
        <h1>Modelo Page</h1>
      </div>
      <div className="recommendations">
        {currentCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
          />
        ))}
      </div>
      <div className="pagination-Component">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div> 
  );
}

export default Modelos;