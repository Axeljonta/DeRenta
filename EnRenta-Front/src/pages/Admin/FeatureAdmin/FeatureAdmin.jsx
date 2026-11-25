import React, { useState, useEffect } from 'react';
import { featureService } from '../../../services/featureService.js';
import * as FaIcons from 'react-icons/fa6';
import "./FeatureAdmin.css";

const FeatureAdmin = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el formulario de creación
  const [newFeature, setNewFeature] = useState({
    featureName: '',
    featureIcon: ''
  });

  // Cargar lista de características al montar
  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await featureService.getAll();
      setFeatures(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las características.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeature({
      ...newFeature,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeature.featureName.trim() || !newFeature.featureIcon.trim()) return;

    try {
      await featureService.create(newFeature);
      setNewFeature({ featureName: '', featureIcon: '' });
      loadFeatures();
    } catch (err) {
      alert(err.response?.data || 'Error al guardar la característica.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar esta característica?')) return;

    try {
      await featureService.delete(id);
      loadFeatures();
    } catch (err) {
      alert('No se pudo eliminar la característica.');
      console.error(err);
    }
  };
  
  const renderIcon = (iconName) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent ? <IconComponent className="feature-icon-preview" /> : <FaIcons.FaCircleQuestion className="feature-icon-preview" />;
  };

  return (
    <div className="feature-admin-container isVisible">
      <div className="feature-admin-header">
        <h2>Gestión de Características de Vehículos</h2>
      </div>

      <div className="feature-admin-content">
        {/* Formulario para agregar nueva característica */}
        <form onSubmit={handleSubmit} className="feature-admin-form">
          <div className="feature-form-group">
            <input
              type="text"
              name="featureName"
              className="feature-form-input"
              placeholder="Nombre (ej. Aire Acondicionado)"
              value={newFeature.featureName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="feature-form-group">
            <input
              type="text"
              name="featureIcon"
              className="feature-form-input"
              placeholder="react-icons/fa6 (ej: FaSnowflake, FaWifi, FaCar, FaLock)."
              value={newFeature.featureIcon}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>

        {/* Mensajes de estado */}
        {loading && <p className="feature-message">Cargando características...</p>}
        {error && <p className="feature-message feature-message-error">{error}</p>}

        {/* Listado de características */}
        {!loading && (
          <table className="feature-admin-table">
            <thead className="feature-admin-table-header">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Ícono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="feature-admin-table-body">
              {features.map((item) => (
                <tr key={item.id} className="feature-admin-table-row">
                  <td>{item.id}</td>
                  <td>{item.featureName}</td>
                  <td>
                    <span className="feature-icon-wrapper">
                      {renderIcon(item.featureIcon)}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {features.length === 0 && (
                <tr>
                  <td colSpan="4" className="feature-empty-row">
                    No hay características cargadas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        
      </div>
    </div>
  );
};

export default FeatureAdmin;