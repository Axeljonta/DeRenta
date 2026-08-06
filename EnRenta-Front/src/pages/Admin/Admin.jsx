// pages/Admin.jsx
import {Link} from 'react-router-dom';
import './Admin.css';


function Admin() {
  return (
    <div className="admin-page">
      <div className="admin-container">
          <h1>Panel Admin</h1>      

          <div className="admin-section"> 
            <h4>Agregar Vehículo </h4>
            <Link to="/admin/save-car">
                <button className='admin-botton'>Agregar Auto</button>
            </Link>
          </div>
      </div>
      <div className="mobile-message">
        <p>Esta función no está disponible en modo móvil.</p>
      </div> 
    </div>
    
  );
};

export default Admin;  