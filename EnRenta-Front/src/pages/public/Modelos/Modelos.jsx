import {useAllCars} from "../../../hooks/useAllCars.js";
import { CarCard } from "../../../components/CarCard/CarCard.jsx";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination/Pagination.jsx";
import "./Modelos.css";
import { CategoryFilter } from "./components/CategoryFilter.jsx";
import { useSearchParams } from "react-router-dom";

function Modelos() {
  // Recuperamos array de autos
  const { cars, loading } = useAllCars();

  

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [carsQuantity, setCarsQuantity] = useState(6);

 // Param de categoría desde la URL 
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const parsedCategoryId = categoryParam !== null ? Number(categoryParam) : null;
  const initialCategoryId =
    parsedCategoryId !== null && !Number.isNaN(parsedCategoryId)
      ? parsedCategoryId
      : null;

  // Estado inicializado con la categoría de la URL si existe
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategoryId !== null ? [initialCategoryId] : []
  );

  // Extraer categorías únicas por ID (evitando duplicados por referencia de objeto y nulls)
  const availableCategories = cars
    ? Array.from(
        new Map(
          cars
            .map((car) => car.category)
            .filter((cat) => cat && cat.id != null)
            .map((cat) => [cat.id, cat])
        ).values()
      )
    : [];

  // Función para agregar o quitar IDs de categorías seleccionadas
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    setCurrentPage(1); // Reseteamos a la página 1 al filtrar
  };

  // Función para limpiar los filtros
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  // 1. FILTRADO
  const filteredCars = cars
    ? cars.filter((car) => {
        if (selectedCategories.length === 0) return true;
        return (
          car.category?.id != null &&
          selectedCategories.includes(car.category.id)
        );
      })
    : [];

  // 2. PAGINACIÓN SOBRE LOS AUTOS YA FILTRADOS
  const totalItems = filteredCars.length;
  const totalPages = Math.ceil(totalItems / carsQuantity);

  const indexOfLastCar = currentPage * carsQuantity;
  const indexOfFirstCar = indexOfLastCar - carsQuantity;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return <p>Cargando autos...</p>;
  }

  console.log({
  urlCategory: searchParams.get("category"),
  selectedCategories,
  carCategories: cars?.map((c) => c.category?.id),
});

  return (
    <div className="modelos">
      <div>
        <h1>Nuestros modelos disponibles</h1>
      </div>

      {/* Componente de filtros */}
      <CategoryFilter
        categories={availableCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onClearFilters={handleClearFilters}
        totalFiltered={totalItems}
        totalOriginal={cars ? cars.length : 0}
        initialCategoryId={initialCategoryId}
      />

      <div className="modelos-container">
        {currentCars.length > 0 ? (
          currentCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))
        ) : (
          <p>No se encontraron vehículos con las categorías seleccionadas.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-component">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default Modelos;