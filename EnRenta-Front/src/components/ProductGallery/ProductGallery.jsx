import './ProductGallery.css';
import { useNavigate } from "react-router-dom";
import { useCarById } from "../../hooks/useCarById";
import { useState } from "react";
import ModalGallery from './ModalGallery.jsx';

const ProductGallery = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const car = useCarById(); 

    if (!car) {return <p>Cargando...</p>;}

    const mainImage = car.images.find(
        image => image.mainImage
    );
    
    console.log('Hola', mainImage);
    

    const secondaryImage = car.images.filter(
        image => !image.mainImage
    );
    
    return (
                <div className="product-gallery">

                    <div className="primary-image">
                        <img src={mainImage.imageUrl} alt={car.carName} />
                    </div>

                    <div className="secondary-images">
                        {secondaryImage.slice(0, 4).map((image) => (
                                <img key={image.id} src={image.imageUrl} alt={car.carName} />
                            ))
                        }
                        <div className='button button-gallery'>
                            <button onClick={() => setIsModalOpen(true)}>Ver más...</button>
                        </div>
                    </div> 
                    
                    <ModalGallery
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        images={car.images}
                        title={car.carName}
                    
                    />
                

                </div>
    );
};

export default ProductGallery;