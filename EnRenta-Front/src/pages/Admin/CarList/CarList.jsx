import {useAllCars} from "../../../hooks/useAllCars.js";
import {carService} from "../../../services/carService.js";
import { useState } from "react";
import ModalGallery from "../../../components/ProductGallery/ModalGallery.jsx";
import { SaveCarForm } from "../SaveCar/SaveCarForm/SaveCarForm.jsx";
import "./CarList.css";

const CarList = () => {
    const { cars = [] , setCars} = useAllCars();
    //Modal para confirmar la eliminacion de un auto
    const [carToDelete, setCarToDelete] = useState(null);
    //modal para editar auto 
    const [carToEdit, setCarToEdit] = useState(null);
    
    //Manejar en Modal para ver todas las imagenes de un auto
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    //Manejador modale imagenes
    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
        setIsModalOpen(false);
    }

    //manejador para confirmar la eliminacion de un auto
    const handleDeleteClick = (car) => {
        setCarToDelete(car);
    };

    //Manejador para editar
    const handleEditClick = (car) =>{
        setCarToEdit(car)
    }

    //Confirmar eliminar auto
    const handleConfirmDeleteCar = async (carId) => {
        
        // Lógica para eliminar el auto con el id proporcionado
        try {
            await carService.deleteCar(carId);
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
            setCarToDelete(null);
            alert("Auto eliminado correctamente");
        } catch (error) {
            alert("Error al eliminar el auto");
            console.error(error);
        }
    };

    //Cancelar eliminar auto 
    const handleCancelDelete = () => {
    setCarToDelete(null);
    }; 
    //Cancelar Editar
    const handleCancelEdit = () => {
        setCarToEdit(null);
    }; 
    

 return (
    <div>
      <div className="admin-list-container isVisible">
        <div className="admin-list-header">
          <h2>{carToEdit ? "Editar Producto" : "Agregar Producto"}</h2>
        </div>

        <div className="admin-list-content">
          <table className="admin-list-table">
            <thead className="admin-list-table-header">
              <tr>
                <th>Id</th>
                <th>Modelo</th>
                <th>Descripción</th>
                <th>Imagenes</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="admin-list-table-body">
              {cars.map((car) => (
                <tr key={car.id} className="admin-list-table-row">
                  <td>{car.id}</td>
                  <td>{car.carName}</td>
                  <td className="col-description">{car.carDescription}</td>
                  <td>
                    <img
                      src={car.mainImageUrl}
                      alt={car.carName}
                      className="admin-table-img"
                      onClick={() => handleOpenModal(car)}
                    />
                  </td>
                  <td>proximamente</td>
                  <td className="col-category">
                    {car.category?.name
                      ? car.category.name.charAt(0).toUpperCase() +
                        car.category.name.slice(1).toLowerCase()
                      : "Sin categoría"}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(car)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(car)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal para ver todas las imágenes de un auto */}
          {selectedCar && (
            <div className="modal-gallery-container">
              <ModalGallery
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                images={selectedCar?.images || []}
                title={selectedCar?.carName || ""}
              />
            </div>
          )}

          {/* Modal para confirmar la eliminación de un auto */}
          {carToDelete && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Confirmar eliminación</h3>
                <p>
                  ¿Estás seguro de que deseas eliminar el producto{" "}
                  <strong>{carToDelete.carName}</strong>? Esta acción no se puede
                  deshacer.
                </p>
                <div className="modal-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancelDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleConfirmDeleteCar(carToDelete.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal para editar un auto */}
          {carToEdit && (
            <div className="modal-overlay">
              <div className="modal-content form-modal-content">
                <SaveCarForm
                  carToEdit={carToEdit}
                  setCars={setCars}
                  onClose={handleCancelEdit}
                />
                <button
                  className="btn btn-secondary btn-edit"
                  onClick={handleCancelEdit}
                >
                  Salir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mobile-message">
        <p>Esta función no está disponible en modo móvil.</p>
      </div>
    </div>
  );
};

export default CarList;