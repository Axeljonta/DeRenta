import './ModalGallery.css';


const ModalGallery = ({isOpen, onClose, images, title}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-gallery" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
                    &times;
                </button>
                <h3 className="modal-title">{title}</h3>
                    <div className="modal-images">
                        {images && images.map((image) => (
                            <div key={image.id} className="modal-image-wrapper">
                                <img src={image.imageUrl} alt={title || 'Imagen de la galería'} />
                            </div>
                        ))}
                    </div>
                </div>  
            </div>
    );
}

export default ModalGallery;