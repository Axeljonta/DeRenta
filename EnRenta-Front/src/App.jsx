import { useState } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import { Footer } from "./components/Footer/Footer.jsx"

import Home from "./pages/Home/Home.jsx";
import Modelos from "./pages/Modelos/Modelos.jsx";
import Sucursales from "./pages/Sucursales/Sucursales.jsx";
import FAQs from "./pages/FAQs/FAQs.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import SaveCar from "./pages/Admin/pages/SaveCar/SaveCar.jsx";
import CarDetail from "./pages/CarDetail/CarDetail.jsx";
import CarList from "./pages/Admin/pages/CarList/CarList.jsx";

function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />}/>
            <Route path="/Home" element={<Home />} />
            <Route path="/Modelos" element={<Modelos />} />
            <Route path="/Sucursales" element={<Sucursales />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/cars/:id" element={<CarDetail/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/save-car" element={<SaveCar />} />
            <Route path="/admin/list-cars" element={<CarList />} />
        </Routes> 
      </main>
      <section className="homeFooter">
        <Footer />
      </section>
    </BrowserRouter>
    
  )
}

export default App
