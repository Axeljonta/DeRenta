import "./CarCard.css";
import {Link} from 'react-router-dom';

export const CarCard = ({ car }) => {

    
    const mainImage = car.carImages?.find(
        (img) => img.mainImage
    ); 

    return (
        <article className="car-card">

            <img src={car.mainImageUrl} alt={car.carName}/>

            <div className="car-card-content">

                <Link to={`/cars/${car.id}`} className="car-card-title">
                    <h5>{car.carName}</h5>
                </Link>
                <small>2011 | 2.0 SE-G | Manual</small>

                <p>{car.carDescription}</p>

            </div>

        </article>
  );
};