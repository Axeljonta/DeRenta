import React, { useState } from "react";
import { userService } from "../../../services/userService";
import "./RegisterForm.css";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Estado para guardar el email del usuario registrado y el estado del reenvío
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setResendMessage(null);

    try {
      await userService.registerUser(formData);
      setRegisteredEmail(formData.email); // Guardamos el email para el reenvío
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setError(typeof err === "string" ? err : err.message || "Error al registrar la cuenta");
    } finally {
      setLoading(false);
    }
  };

  // Función exclusiva para el botón de reenvío
  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage(null);
    try {
      await userService.resendConfirmation(registeredEmail);
      setResendMessage("¡Correo reenviado con éxito!");
    } catch (err) {
      setResendMessage("No se pudo reenviar. Inténtalo de nuevo.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="rf-card">
      <h2 className="rf-title">Crear Cuenta</h2>

      {/* Si se registró con éxito, mostramos el mensaje y el botón de reenvío */}
      {success ? (
        <div style={{ textAlign: "center", padding: "15px 0" }}>
          <div className="rf-alert rf-alert-success" style={{ marginBottom: "15px" }}>
            ¡Usuario registrado con éxito! Te enviamos un correo de confirmación.
          </div>

          <button 
            type="button" 
            onClick={handleResend} 
            className="rf-submit-btn" 
            disabled={resendLoading}
            style={{ marginBottom: "10px" }}
          >
            {resendLoading ? "Enviando..." : "¿No llegó? Reenviar correo"}
          </button>

          {resendMessage && (
            <p style={{ fontSize: "13px", marginTop: "10px", fontWeight: "bold" }}>
              {resendMessage}
            </p>
          )}
        </div>
      ) : (
        /* Tu formulario original intacto */
        <>
          {error && <div className="rf-alert rf-alert-error">{error}</div>}

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
        </>
      )}
    </div>
  );
};