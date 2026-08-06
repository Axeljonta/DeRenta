import { useState } from "react";
import { useAllCars } from "../../../../hooks/useAllCars";
import { createCar } from "../../../../services/productService";
import './SaveCarForm.css';


export const SaveCarForm = () => {
  const { cars } = useAllCars();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    carName: "",
    carDescription: "",
    images: [
      {
        imageUrl: "",
        mainImage: true,
      },
    ],
  });

  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImgChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index].imageUrl = value;

    setForm({
      ...form,
      images: newImages,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!form.carName.trim() || !form.carDescription.trim()) {
      setError("El nombre y la descripción son obligatorios.");
      return;
    }

    // Comprobar si existe un auto con el mismo nombre
    const exists = cars?.some(
      (car) => car.carName.toLowerCase().trim() === form.carName.toLowerCase().trim()
    );

    if (exists) {
      setError("Ya existe un auto registrado con ese nombre.");
      return;
    }

    // Filtrar imágenes vacías antes de enviar
    const cleanPayload = {
      ...form,
      images: form.images.filter((img) => img.imageUrl.trim() !== ""),
    };

    try {
      await createCar(cleanPayload); // Envía el JSON tal cual Postman
      alert("Auto agregado con éxito");

      setForm({
        carName: "",
        carDescription: "",
        images: [{ imageUrl: "", mainImage: true }],
      });
    } catch (err) {
      setError(err.message || "Error al guardar el vehículo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="save-car-form">
      <h2>Agregar Producto</h2>

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

      <div className="images-section">
        <label>Imágenes del producto:</label>
        {form.images.map((image, index) => (
          <input
            key={index}
            type="text"
            placeholder={index === 0 ? "URL Imagen Principal" : `URL Imagen ${index + 1}`}
            value={image.imageUrl}
            onChange={(e) => handleImgChange(index, e.target.value)}
          />
        ))}

        <button type="button" onClick={addImageField}>
          + Agregar otra imagen
        </button>
      </div>

      <button type="submit">Agregar producto</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
