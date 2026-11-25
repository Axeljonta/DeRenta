import { useNavigate } from "react-router-dom";
import { useCarById } from "../../../hooks/useCarById.js";
import { FaAngleDoubleLeft } from "react-icons/fa";
import ProductGallery from "../../../components/ProductGallery/ProductGallery.jsx";
import { CarFeaturesDetail } from "./CarFeaturesDetail/CarFeaturesDetail.jsx";
import "./CarDetail.css";

const CarDetail = () => {

    const response = useCarById();
    const car = response?.car;
    const navigate = useNavigate();
    
    console.log("car en CarDetail:", car);

    if (!car || response.loading) { 
        return <p>Cargando galería...</p>; 
    }

    return ( 
    
        <section className="product-detail">
            <header className="product-header">
                <h1>{car.carName}</h1>
                <button onClick={() => navigate(-1)}><FaAngleDoubleLeft/></button>
            </header>
            <div className="product-body">
                <ProductGallery name={car.carName} images={car.images}  />
            </div>  
            <div className="product-description">
                <p>{car.carDescription}</p> 
            </div>
            <div>
                <CarFeaturesDetail features={car.features} />
            </div>
            
        </section>
  );
}
export default CarDetail;