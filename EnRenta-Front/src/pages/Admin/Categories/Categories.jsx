import { useEffect, useState } from "react";
import { categoryService } from "../../../services/categoryService";

const initialForm = {
  name: "",
  description: "",
  imageUrl: "",
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name || "",
      description: category.description || "",
      imageUrl: category.imageUrl || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setForm(initialForm);
  };

  const handleDeleteClick = async (category) => {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar la categoría "${category.name}"?`
    );
    if (!confirmed) return;

    try {
      setLoading(true);
      await categoryService.deleteCategory(category.id);
      setCategories((prev) => prev.filter((item) => item.id !== category.id));

      if (editingCategory?.id === category.id) {
        handleCancelEdit();
      }

      alert("Categoría eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert(
        typeof error === "string"
          ? error
          : "Error al eliminar la categoría (verificá si tiene autos asociados)"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
    };

    try {
      setLoading(true);

      if (editingCategory) {
        const updated = await categoryService.updateCategory(
          editingCategory.id,
          payload
        );
        const updatedItem = updated?.id
          ? updated
          : { ...editingCategory, ...payload };

        setCategories((prev) =>
          prev.map((item) =>
            item.id === editingCategory.id ? updatedItem : item
          )
        );
        handleCancelEdit();
        alert("Categoría actualizada correctamente");
      } else {
        const created = await categoryService.createCategory(payload);
        if (created?.id) {
          setCategories((prev) => [...prev, created]);
        } else {
          await loadCategories();
        }
        setForm(initialForm);
        alert("Categoría creada correctamente");
      }
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      alert(
        typeof error === "string" ? error : "Error al guardar la categoría"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-list-container isVisible">
        <div className="admin-list-header">
          <h2>{editingCategory ? "Editar Categoría" : "Agregar Categoría"}</h2>
        </div>

        <div className="admin-list-content">
          <form onSubmit={handleSubmit} className="admin-list-form">
            <div>
              <label htmlFor="name">Título</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: DEPORTIVO"
                required
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <input
                id="description"
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción de la categoría"
              />
            </div>

            <div>
              <label htmlFor="imageUrl">Imagen representativa</label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/imagen.jpg"
              />
            </div>

            <div className="admin-list-form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Guardando..."
                  : editingCategory
                  ? "Guardar cambios"
                  : "Agregar categoría"}
              </button>

              {editingCategory && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <table className="admin-list-table">
            <thead className="admin-list-table-header">
              <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="admin-list-table-body">
              {categories.map((category) => (
                <tr key={category.id} className="admin-list-table-row">
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td       
                    className="col-description"
                    title={category.description || "Sin descripción"}
                    >
                    {category.description || "Sin descripción"}
                  </td>
                  <td>
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="admin-table-img"
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEditClick(category)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(category)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mobile-message">
        <p>Esta función no está disponible en modo móvil.</p>
      </div>
    </div>
  );
};

export default Categories;