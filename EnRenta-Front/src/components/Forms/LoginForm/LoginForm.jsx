import { useState } from "react";
import { userService } from "../../../services/userService";
import "./LoginForm.css";

export const LoginForm = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await userService.loginUser(credentials);
      // 'data' contiene los datos del usuario (id, firstName, lastName, token/email)
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    } catch (err) {
      console.error("Error de autenticación:", err);
      // Mensaje de error claro y útil ante credenciales inválidas
      setError(
        typeof err === "string" 
          ? err 
          : "Correo electrónico o contraseña incorrectos. Por favor, verifica tus datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lf-card">
      <h2 className="lf-title">Iniciar Sesión</h2>

      {error && <div className="lf-alert lf-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="lf-form">
        <div className="lf-field-group">
          <label htmlFor="email" className="lf-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="lf-input"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="lf-field-group">
          <label htmlFor="password" className="lf-label">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            className="lf-input"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="lf-submit-btn" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};