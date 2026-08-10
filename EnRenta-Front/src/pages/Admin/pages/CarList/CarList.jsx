import {useAllCars} from "../../../../hooks/useAllCars.js";
import {deleteCarById} from "../../../../services/productService.js";
import { useState } from "react";
import ModalGallery from "../../../../components/ProductGallery/ModalGallery.jsx";
import "./CarList.css";

const CarList = () => {
    const { cars = [] , setCars} = useAllCars();
    //Modal para confirmar la eliminacion de un auto
    const [carToDelete, setCarToDelete] = useState(null);
    
    //Manejar en Modal para ver todas las imagenes de un auto
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);


    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedCar(null);
        setIsModalOpen(false);
    }

    //Modal para confirmar la eliminacion de un auto
    const handleDeleteClick = (car) => {
        setCarToDelete(car);
    };

    const handleConfirmDeleteCar = async (carId) => {
        
        // Lógica para eliminar el auto con el id proporcionado
        try {
            await deleteCarById(carId);
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
            setCarToDelete(null);
            alert("Auto eliminado correctamente");
        } catch (error) {
            alert("Error al eliminar el auto");
            console.error(error);
        }
    };

    const handleCancelDelete = () => {
    setCarToDelete(null);
    };

  return (
    <div className="car-list-container">
        <div className="car-list-header">
            <h2>Lista de Autos</h2>
        </div>  
        <div className="car-list-content">
           <table className="car-list-table">
                <thead className="car-list-table-header">
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
                <tbody className="car-list-table-body">
                    {
                        cars.map((car) => ( 
                        
                            <tr key={car.id} className="car-list-table-row">
                                <td>{car.id}</td>
                                <td>{car.carName}</td>
                                <td className="col-description">{car.carDescription}</td>
                                <td><img    
                                        src={car.mainImageUrl}  
                                        alt={car.carName} 
                                        className="car-table-img" 
                                        onClick={() => handleOpenModal(car)} /></td>
                                <td>proximamente</td>
                                <td>proximamente</td>
                                <td>
                                    <button className="btn btn-primary">Editar</button>
                                    <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDeleteClick(car)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                            
                            )
                        )
                    }
                    
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
                        ¿Estás seguro de que deseas eliminar el producto{' '}
                        <strong>{carToDelete.carName}</strong>? Esta acción no se puede deshacer.
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
            
        </div> 
         
    </div>
  );
}

export default CarList;