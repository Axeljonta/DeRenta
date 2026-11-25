import React from 'react';
import * as FaIcons from 'react-icons/fa6';
import './CarFeaturesDetail.css';

export const CarFeaturesDetail = ({ features = [] }) => {
  const renderIcon = (iconName) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent 
      ? <IconComponent className="detail-feature-icon" /> 
      : <FaIcons.FaCircleQuestion className="detail-feature-icon" />;
  };

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="car-features-detail-container">
      <h3>¿Qué ofrece este vehículo?</h3>
      <div className="car-features-detail">
        {features.map((feature) => (
          <div key={feature.id} className="car-feature-detail-item">
            {renderIcon(feature.featureIcon)}
            <span className="car-feature-detail-name">{feature.featureName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};