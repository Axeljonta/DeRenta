import React, { useState } from "react";
import { userService } from "../../../services/userService";
import "./RegisterForm.css";

export const RegisterForm = () => {
  // Estado único para capturar todos los campos del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Estados de retroalimentación para la UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Manejador genérico para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envío del formulario consumiendo userService
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await userService.registerUser(formData);
      setSuccess(true);
      // Limpia el formulario tras un registro exitoso
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      // Toma el mensaje devuelto por el backend o un texto por defecto
      setError(typeof err === "string" ? err : err.message || "Error al registrar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rf-card">
      <h2 className="rf-title">Crear Cuenta</h2>

      {/* Alertas con prefijo exclusivo */}
      {success && (
        <div className="rf-alert rf-alert-success">
          ¡Usuario registrado con éxito!
        </div>
      )}

      {error && (
        <div className="rf-alert rf-alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="rf-form">
        <div className="rf-field-group">
          <label htmlFor="firstName" className="rf-label">Nombre</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            className="rf-input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rf-field-group">
          <label htmlFor="lastName" className="rf-label">Apellido</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            className="rf-input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rf-field-group">
          <label htmlFor="email" className="rf-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="rf-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="rf-field-group">
          <label htmlFor="password" className="rf-label">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            className="rf-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="rf-submit-btn" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};