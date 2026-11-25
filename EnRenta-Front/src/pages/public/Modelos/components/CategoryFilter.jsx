import React from "react";
import "./CategoryFilter.css";
import { useEffect } from "react";

export const CategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  onClearFilters,
  totalFiltered,
  totalOriginal,
  initialCategoryId = null,
}) => {
  useEffect(() => {
  if (
    initialCategoryId != null &&
    !selectedCategories.includes(initialCategoryId)
  ) {
    onCategoryChange(initialCategoryId);
  }
}, [initialCategoryId]);

  const formatCategoryLabel = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };


  return (
    <div className="category-filter-container">
      <div className="filter-header">
        <h4>Filtrar por Categoría</h4>

        {/* Botón para limpiar filtros */}
        {selectedCategories.length > 0 && (
          <button
            type="button"
            className="clear-filter-btn"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Lista de categorías con checkboxes */}
      <div className="categories-list">
        {categories.map((cat) => (
          <label key={cat.id} className="category-label">
            <input
              type="checkbox"
              value={cat.id}
              checked={selectedCategories.includes(cat.id)}
              onChange={() => onCategoryChange(cat.id)}
            />
            <span>{formatCategoryLabel(cat.name)}</span>
          </label>
        ))}
      </div>

      {/* Contador de resultados */}
      <div className="filter-counters">
        <p>
          Mostrando <strong>{totalFiltered}</strong> de {totalOriginal} vehículos
        </p>
      </div>
    </div>
  );
};