import './ModalGallery.css';


const ModalGallery = ({isOpen, onClose, images, title}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-gallery" onClick={onClose}>
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-images">
                    {images.map((image) => (
                        <img key={image.id} src={image.imageUrl} alt={title} />
                    ))}
                </div>
            </div>
        </div>
    );

    
}

export default ModalGallery;