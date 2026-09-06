import { SaveCarForm } from "./SaveCarForm/SaveCarForm.jsx"
import "./SaveCar.css"


const SaveCar = () => {
  return (
    <div>
      <div className=" isVisible save-car">
        <h2>Agregar Auto</h2>
        <SaveCarForm />
      </div>
      <div className="mobile-message">
          <p>Esta función no está disponible en modo móvil.</p>
      </div> 
    </div>
  );
};

export default SaveCar;