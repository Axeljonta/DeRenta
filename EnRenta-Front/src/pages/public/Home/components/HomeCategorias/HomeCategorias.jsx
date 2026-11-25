import { useEffect, useState } from "react";
import { categoryService } from "../../../../../services/categoryService"; 
import { useNavigate } from "react-router-dom";
import "./HomeCategorias.css"; 

export const HomeCategorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSelectCategory = (categoryId) => {
    navigate(`/modelos?category=${categoryId}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar categorías en el Home:", err);
        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="home-categorias">
        <p className="home-categorias-status">Cargando categorías...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="home-categorias">
        <p className="home-categorias-status">{error}</p>
      </section>
    );
  }

  return (
    <section className="home-categorias">
      <div className="home-categorias-grid">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="home-categoria-card"
            onClick={() => handleSelectCategory(cat.id)}
            
          >
            {cat.imageUrl ? (
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="home-categoria-img"
              />
            ) : (
              <span className="home-categoria-icon">🚗</span>
            )}
            <h3>{cat.name}</h3>
            {cat.description && <p>{cat.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};