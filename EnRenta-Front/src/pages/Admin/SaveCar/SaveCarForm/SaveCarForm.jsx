import { useEffect, useState } from "react";
import { useAllCars } from "../../../../hooks/useAllCars";
import { carService } from "../../../../services/carService";
import { featureService } from "../../../../services/featureService";
import { categoryService } from "../../../../services/categoryService";
import * as FaIcons from "react-icons/fa6";
import './SaveCarForm.css';

export const SaveCarForm = ({ carToEdit = null, setCars, onClose }) => {
  // Obtiene el listado completo de autos para hacer validaciones de duplicados
  const { cars } = useAllCars();
  
  // Estado para gestionar los mensajes de error a mostrar en el formulario
  const [error, setError] = useState("");

  // Estado para almacenar el catálogo completo de categorias cargadas de la BD
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setAvailableCategories(data);
      } catch (err) {
        console.error("Error al cargar categorias:", err);
      }
    };
    fetchCategories();
  }, []);

  // Estado para almacenar el catálogo completo de características cargadas de la BD
  const [availableFeatures, setAvailableFeatures] = useState([]);

  // Cargar el catálogo de características desde el backend al montar el componente
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await featureService.getAll();
        setAvailableFeatures(data);
      } catch (err) {
        console.error("Error al cargar características:", err);
      }
    };
    fetchFeatures();
  }, []);

  // Estado principal del formulario (valores por defecto para creación)
  const [form, setForm] = useState({
    carName: "",
    carDescription: "",
    categoryId: "",
    features: [], // Guarda los IDs de las características seleccionadas [1, 2, 5]
    images: [
      {
        imageUrl: "",
        mainImage: true, // La primera imagen se marca como principal por defecto
      },
    ],
  });

  

  // 2. Si se recibe `carToEdit`, llena el formulario con los datos existentes (Modo Edición)
  useEffect(() => {
    if (carToEdit) {
      setForm({
        carName: carToEdit.carName || "",
        carDescription: carToEdit.carDescription || "",
        categoryId: carToEdit.category?.id || null,
        features: carToEdit.features ? carToEdit.features.map((f) => f.id) : [],
        images: carToEdit.images?.length > 0 
          ? carToEdit.images.map(img => ({ ...img }))
          : [{ imageUrl: "", mainImage: true }],
      });
    } else {
      // Si se pasa a modo creación limpia el formulario
      setForm({
        carName: "",
        carDescription: "",
        category: "",
        features: [],
        images: [{ imageUrl: "", mainImage: true }],
      });
    }
  }, [carToEdit]);

  // Maneja los cambios de los inputs de texto (carName, carDescription, category)
  const handleChange = (e) => {
    setError(""); // Limpia los errores al modificar un campo
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Maneja la selección/deselección de checkboxes de características
  const handleFeatureToggle = (featureId) => {
    setError("");
    setForm((prevForm) => {
      const isSelected = prevForm.features.includes(featureId);
      const updatedFeatures = isSelected
        ? prevForm.features.filter((id) => id !== featureId) // Desmarca
        : [...prevForm.features, featureId];                 // Marca

      return {
        ...prevForm,
        features: updatedFeatures,
      };
    });
  };

  // Maneja el cambio inmutable del valor de una URL de imagen
  const handleImgChange = (index, value) => {
    setForm((prevForm) => {
      const updatedImages = prevForm.images.map((img, i) =>
        i === index ? { ...img, imageUrl: value } : img
      );
      return { ...prevForm, images: updatedImages };
    });
  };

  // Agrega un nuevo campo de texto dinámico para una imagen adicional
  const addImageField = () => {
    setForm({
      ...form,
      images: [
        ...form.images,
        {
          imageUrl: "",
          mainImage: false,
        },
      ],
    });
  };

  // Remueve un campo de imagen adicional
  const removeImageField = (index) => {
    setForm((prevForm) => {
      const filtered = prevForm.images.filter((_, i) => i !== index);
      const updatedImages = filtered.map((img, i) => ({
        ...img,
        mainImage: i === 0,
      }));
      return { ...prevForm, images: updatedImages };
    });
  };

  // Renderizador dinámico del ícono mediante react-icons
  const renderIcon = (iconName) => {
    const IconComponent = FaIcons[iconName];
    return IconComponent 
      ? <IconComponent className="save-car-feature-icon" /> 
      : <FaIcons.FaCircleQuestion className="save-car-feature-icon" />;
  };

  // Procesa el envío del formulario (Creación o Edición)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validar campos requeridos
    if (!form.carName.trim() || !form.carDescription.trim()) {
      setError("El nombre y la descripción son obligatorios.");
      return;
    }

    // 2. Comprobar si ya existe otro auto con el mismo nombre
    const exists = cars?.some(
      (car) =>
        car.carName.toLowerCase().trim() === form.carName.toLowerCase().trim() &&
        car.id !== carToEdit?.id
    );

    if (exists) {
      setError("Ya existe un auto registrado con ese nombre.");
      return;
    }

    // 3. Preparar el payload transformando los IDs de características
    const cleanPayload = {
        id: carToEdit ? carToEdit.id : null, 
        carName: form.carName,
        carDescription: form.carDescription,
        categoryId: form.categoryId ? Number(form.categoryId) : null,
        featureIds: form.features,         
        images: form.images.filter((img) => img.imageUrl.trim() !== ""),
    };
    
    try {
      if (carToEdit) {
        console.log("Payload enviado al backend (UPDATE):", cleanPayload);
        const updatedCar = await carService.updateCar(carToEdit.id, cleanPayload);

        if (setCars) {
          setCars((prevCars) => 
            prevCars.map((car) => (car.id === carToEdit.id ? updatedCar : car))
          );
        }
        
      } else {
        console.log("Payload enviado al backend (CREATE):", cleanPayload);
        const createdCar = await carService.createCar(cleanPayload);
        
        if (setCars) {
          setCars((prevCars) => [...prevCars, createdCar]);
        }

        setForm({
          carName: "",
          carDescription: "",
          category: "",
          features: [],
          images: [{ imageUrl: "", mainImage: true }],
        });

        
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(err.message || "Error al guardar el vehículo.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="save-car-form">
      <h2>{carToEdit ? "Editar Producto" : "Agregar Producto"}</h2>

      <input
        type="text"
        name="carName"
        placeholder="Nombre del auto"
        value={form.carName}
        onChange={handleChange}
      />

      <textarea
        name="carDescription"
        placeholder="Descripción"
        value={form.carDescription}
        onChange={handleChange}
      />

      <select
        name="categoryId"
        id="categoryId"
        value={form.categoryId}
        onChange={handleChange}
      >
        <option value="">Seleccionar categoría</option>
        {availableCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryName || cat.name}
          </option>
          ))}
      </select>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <div className="save-car-features-section">
        <label className="section-title">Características del vehículo:</label>
        {availableFeatures.length === 0 ? (
          <p className="no-features-text">No hay características cargadas en el sistema.</p>
        ) : (
          <div className="save-car-features-grid">
            {availableFeatures.map((feature) => (
              <label key={feature.id} className="save-car-feature-item">
                <input
                  type="checkbox"
                  checked={form.features.includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                  className="save-car-feature-checkbox"
                />
                <span className="save-car-feature-label">
                  {renderIcon(feature.featureIcon)}
                  {feature.featureName}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* SECCIÓN DE IMÁGENES */}
      <div className="images-section">
        <label className="section-title">Imágenes del producto:</label>
        {form.images.map((image, index) => (
          <div key={index} className="image-input-group">
            <input
              name={`image-${index}`}
              type="text"
              placeholder={index === 0 ? "URL Imagen Principal" : `URL Imagen ${index + 1}`}
              value={image.imageUrl}
              onChange={(e) => handleImgChange(index, e.target.value)}
            />
            {form.images.length > 1 && (
              <button
                type="button"
                className="remove-img-btn"
                onClick={() => removeImageField(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addImageField}>
          + Agregar otra imagen
        </button>
      </div>

      <button type="submit">
        {carToEdit ? "Guardar Cambios" : "Agregar producto"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  ); 
};