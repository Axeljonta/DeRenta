import { useNavigate } from "react-router-dom";
import { useCarById } from "../../hooks/useCarById";
import { FaAngleDoubleLeft } from "react-icons/fa";
import ProductGallery from "../../components/ProductGallery/ProductGallery.jsx";
import "./CarDetail.css";

const CarDetail = () => {

    const car = useCarById();
    const navigate = useNavigate();

    if (!car) {
        return <p>Cargando...</p>;
    }

    return ( 
    
        <section className="product-detail">
            <header className="product-header">
                <h1>{car.carName}</h1>
                <button onClick={() => navigate(-1)}><FaAngleDoubleLeft/></button>
            </header>
            <div className="product-body">
                <ProductGallery />
            </div> 
            <p>{car.carDescription}</p> 
        </section>
  );
}
export default CarDetail;