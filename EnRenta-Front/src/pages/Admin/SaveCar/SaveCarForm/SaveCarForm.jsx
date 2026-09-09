import { useEffect, useState } from "react";
import { useAllCars } from "../../../../hooks/useAllCars";
import { carService } from "../../../../services/carService";
import './SaveCarForm.css';


export const SaveCarForm = ({ carToEdit = null, setCars}) => {
  
 // Obtiene el listado completo de autos para hacer validaciones de duplicados
  const { cars } = useAllCars();
  
  // Estado para gestionar los mensajes de error a mostrar en el formulario
  const [error, setError] = useState("");

  // Estado principal del formulario (valores por defecto para creación)
  const [form, setForm] = useState({
    carName: "",
    carDescription: "",
    category: "",
    images: [
      {
        imageUrl: "",
        mainImage: true, // La primera imagen se marca como principal por defecto
      },
    ],
  });

  // Si se recibe la prop `carToEdit`, llena el formulario con los datos existentes (Modo Edición)
  useEffect(() => {
    if (carToEdit) {
      setForm({
        carName: carToEdit.carName || "",
        carDescription: carToEdit.carDescription || "",
        category: carToEdit.category || "",
        // Si el auto a editar tiene imágenes las carga, si no, inicializa con un campo vacío
        images: carToEdit.images?.length > 0 
          ? carToEdit.images 
          : [{ imageUrl: "", mainImage: true }],
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

  // Maneja el cambio del valor de una URL de imagen según su índice en la lista
  const handleImgChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index].imageUrl = value;

    setForm({
      ...form,
      images: newImages,
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
          mainImage: false, // Las imágenes adicionales no son principales
        },
      ],
    });
  };

  // Procesa el envío del formulario (Creación o Edición)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene la recarga de página predeterminada del navegador
    setError("");

    // 1. Validar que los campos requeridos no estén vacíos
    if (!form.carName.trim() || !form.carDescription.trim() || !form.category) {
      setError("El nombre, la descripción y la categoría son obligatorios.");
      return;
    }

    // 2. Comprobar si ya existe otro auto con el mismo nombre (evita duplicados)
    const exists = cars?.some(
      (car) =>
        car.carName.toLowerCase().trim() === form.carName.toLowerCase().trim() &&
        car.id !== carToEdit?.id // Excluye el auto actual si estamos editando
    );

    if (exists) {
      setError("Ya existe un auto registrado con ese nombre.");
      return;
    }

    // 3. Limpiar el objeto antes de enviarlo: elimina URLs de imágenes vacías
    const cleanPayload = {
      ...form,
      id: carToEdit ? carToEdit.id : null, // Asegura mandar el ID si es un update
      images: form.images.filter((img) => img.imageUrl.trim() !== ""),
    };
    
    try {
      if(carToEdit){
        console.log("Payload enviado al backend:", cleanPayload);
        const updatedCar = await carService.updateCar(carToEdit.id, cleanPayload)

        if(setCars){
          setCars((prevCars)=> prevCars.map((car)=>(car.id === carToEdit.id ? updatedCar : car)))
        }
      } 
      else{
        await carService.createCar(cleanPayload); // Envía el JSON tal cual Postman
        alert("Auto agregado con éxito");
        setForm({
          carName: "",
          carDescription: "",
          images: [{ imageUrl: "", mainImage: true }],
        });}
      
       
    }catch (err) {
      setError(err.message || "Error al guardar el vehículo.");
    };
  }

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

      <select
        name="category"
        id="category"
        value={form.category}
        onChange={handleChange}>
          <option value="">Seleccionar categoría</option>
          <option value="ECONOMICO">Economico</option>
          <option value="CALLE">Calle</option>
          <option value="DEPORTIVO">Deportivo</option>
          <option value="PREMIUM">Premium</option>
      </select>

      <div className="images-section">
        <label>Imágenes del producto:</label>
        {form.images.map((image, index) => (
          <input
            name={`image-${index}`}
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

      <button type="submit">{carToEdit? "Guardar Cambios" : "Agregar producto"}</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
