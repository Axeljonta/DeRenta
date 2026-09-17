import { useAllUsers } from '../../../hooks/useAllUsers';
import { userService } from '../../../services/userService';
import './UserList.css';

function UserList() {
  const { users, setUsers, loading, error } = useAllUsers();

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole);

      setUsers(prevUsers =>
        prevUsers.map(u => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert('Error al actualizar el rol del usuario');
      console.error(err);
    }
  };

  if (loading) return <div className="ul-container"><p className="ul-message">Cargando usuarios...</p></div>;
  if (error) return <div className="ul-container"><p className="ul-message ul-error">Error: {error}</p></div>;

  return (
    <div className="ul-container">
      <h1 className="ul-title">Gestión de Usuarios</h1>

      <div className="ul-table-wrapper">
        <table className="ul-table">
          <thead>
            <tr>
              <th className="ul-th">ID</th>
              <th className="ul-th">Nombre</th>
              <th className="ul-th">Email</th>
              <th className="ul-th">Rol Actual</th>
              <th className="ul-th">Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => (
              <tr key={userItem.id} className="ul-tr">
                <td className="ul-td">{userItem.id}</td>
                <td className="ul-td">{userItem.firstName} {userItem.lastName}</td>
                <td className="ul-td">{userItem.email}</td>
                <td className="ul-td">
                  <span className={`ul-badge ul-badge-${userItem.role?.toLowerCase()}`}>
                    {userItem.role}
                  </span>
                </td>
                <td className="ul-td">
                  <select
                    value={userItem.role || 'USER'}
                    onChange={(e) => handleRoleChange(userItem.id, e.target.value)}
                    className="ul-select"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;