import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ user, children }) {
  // 1. Si no hay usuario logueado, redirige a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // 3. Si es ADMIN, permite ver el componente hijo
  return children;
}

export function PublicRoute({ user, children }) {
  // 1. Si hay usuario logueado, redirige a Home
  if (user) {
    return <Navigate to="/Home" replace />;
  } 
  return children;
}

