import {useAllCars} from "../../../../hooks/useAllCars.js";
import "./CarList.css";

const CarList = () => {
  const { cars } = useAllCars();

 console.log(cars);
 
    
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
                                <td><img src={car.mainImageUrl} alt={car.carName} className="car-table-img" /></td>
                                <td>proximamente</td>
                                <td>proximamente</td>
                                <td>
                                    <button className="btn btn-primary">Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                            )
                        )
                    }
                    
                </tbody>
            </table>    
        </div> 
         
    </div>
  );
}

export default CarList;