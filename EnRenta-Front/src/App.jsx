import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import { Footer } from "./components/Footer/Footer.jsx"
import { userService } from "./services/userService.js";

import Home from "./pages/public/Home/Home.jsx";
import Modelos from "./pages/public/Modelos/Modelos.jsx";
import Sucursales from "./pages/public/Sucursales/Sucursales.jsx";
import FAQs from "./pages/public/FAQs/FAQs.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import SaveCar from "./pages/Admin/SaveCar/SaveCar.jsx";
import CarDetail from "./pages/public/CarDetail/CarDetail.jsx";
import CarList from "./pages/Admin/CarList/CarList.jsx";
import AuthPage from "./pages/public/AuthPage/AuthPage.jsx";
import { Profile } from "./pages/public/UserProfile/UserProfile.jsx";
import  UserList  from "./pages/Admin/UserList/UserList.jsx";
import { PublicRoute , ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.jsx';

function App() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    const currentUser = userService.getLoggedInUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);

    if (userData.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/Home');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }


  return(
    <>
      <Navbar user={user} onLogout={handleLogout}/>
      <main>
        <Routes>
            {/* Ruta por defecto */}
            <Route path="/" element={<Navigate to="/Home" replace />}/>

            <Route path="/Home" element={<Home />} />
            <Route path="/Modelos" element={<Modelos />} />
            <Route path="/Sucursales" element={<Sucursales />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/cars/:id" element={<CarDetail/>} />

            {/* Rutas solo publicas Register-Login */}

            <Route 
              path="/register"   
              element={
                  <PublicRoute user={user}>
                    <AuthPage mode="register" />
                  </PublicRoute>
              }
            />

            <Route 
              path="/login" 
              element= {
                <PublicRoute user={user}>
                  <AuthPage mode="login" onLoginSuccess={handleLoginSuccess} />
                </PublicRoute>    
                }
            />
            
            
            {/* Ruta del Perfil (Protegida) */}
            <Route 
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />

            {/* Rutas adminis */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/save-car" element={<SaveCar />} />
            <Route path="/admin/list-cars" element={<CarList />} />
            <Route path="/admin/users" element={<UserList />} />
            
        </Routes> 
      </main>
      <section className="homeFooter">
        <Footer />
      </section>
    </>
    
  )
}

export default App
