import "./UserProfile.css";

export const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.firstName?.charAt(0).toUpperCase()}
            {user.lastName?.charAt(0).toUpperCase()}
          </div>
          <h2>{user.firstName} {user.lastName}</h2>
          <span className="profile-role">{user.role}</span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Nombre completo</span>
            <span className="detail-value">{user.firstName} {user.lastName}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Correo electrónico</span>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">ID de Usuario</span>
            <span className="detail-value">#{user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};