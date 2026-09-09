// importo el logo
import logo from '../../assets/LogoNegro.png'
// importo estilos del componente
import './Navbar.css' 
import { UserAvatar } from './UserAvatar/UserAvatar.jsx'
// Importo iconos
import { FaAngleDoubleRight } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
// Importo useState para el menu responsive
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar( { user, onLogout } ) {
  
  const [open, setOpen] = useState(false);
  
    return (
    <>
        {/* Menu nav */}
        <nav className="navbar">
            {/* Menú hamburguesa responsive */}
            <div className="menu" onClick={() => setOpen(!open)}>
            <HiMenuAlt2 className="menu-icon" />
            </div>

            {/* Logo */}
            <div className="navbar-logo">
            <Link to="/Home">
                <img src={logo} alt="Logo" />
            </Link>
            </div>

            {/* Acciones de usuario / Botones de auth */}
            <ul className="navbar-links">
                {user ? (
                    <>
                    <li className="navbar-item-profile">
                        <Link to="/profile" className="navbar-user-link">
                        <UserAvatar
                            firstName={user.firstName}
                            lastName={user.lastName}
                        />
                        </Link>
                    </li>
                    <li>
                        <button
                        onClick={onLogout}
                        className="navbar-btn navbar-btn-logout"
                        >
                        Cerrar Sesión
                        </button>
                    </li>
                    </>
                    ) : (
                    <>
                    <li>
                        <Link to="/register" className="navbar-btn navbar-btn-register">
                        <FaAngleDoubleRight /> Crear cuenta
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="navbar-btn navbar-btn-login">
                        Iniciar sesión
                        </Link>
                    </li>
                    </>
                    )   
                }
            </ul>
        </nav>
        {/* Menu sidebar responsive */}
        <div className={`sidebar ${open ? "active" : ""}`} onClick={() => setOpen(false)}>
            <ul>
                <li><Link to="/Home">Inicio</Link></li>
                <li><Link to="/modelos">Modelos</Link></li>
                <li><Link to="/sucursales">Sucursales</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/">ES / EN</Link></li>
            </ul>
        </div>
    </>
    );
}

export default Navbar;