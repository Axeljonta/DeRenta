import './ProductGallery.css';
import { useState } from "react";
import ModalGallery from './ModalGallery.jsx';

const ProductGallery = ({name ,images = []}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
                <div className="product-gallery">

                    <div className="primary-image">
                        <img src={images[0].imageUrl} alt={name} />
                    </div>

                    <div className="secondary-images">
                        {images?.slice(1, 5).map((image) => (
                                <img key={image.id} src={image.imageUrl} alt={name} />
                            ))
                        }
                        <div className='button button-gallery'>
                            <button onClick={() => setIsModalOpen(true)}>Ver más...</button>
                        </div>
                    </div> 
                    <div className="modal-gallery-container">
                        <ModalGallery
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        images={images}
                        title={name}
                        />
                    </div>
                    
                

                </div>
    );
};

export default ProductGallery;