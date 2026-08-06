import './Pagination.css' 
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export function Pagination({ currentPage, setCurrentPage, totalPages }) {
    
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
            <>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-button pagination-button-prev"
                    >
                        <FaArrowLeft/>
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            disabled={currentPage === number}
                            className="pagination-button pagination-button-number"
                        >
                            {number}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-button pagination-button-next"
                    >
                        <FaArrowRight/>
                    </button>
                </div>
            </>
    )
  };