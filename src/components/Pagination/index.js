import "./index.scss";
import { useEffect, useState } from "react";

const Pagination = ({ perPage, total, paginate, currentPage, dataLength }) => {
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(4);
  const [pageIncrese, setPageIncrase] = useState(true);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i);
  }

  if (currentPage > secondIndex && pageIncrese) {
    setFirstIndex(firstIndex + 4);
    setSecondIndex(secondIndex + 4);
  }

  if (currentPage < secondIndex && secondIndex > 4 && !pageIncrese) {
    setFirstIndex(firstIndex - 4);
    setSecondIndex(secondIndex - 4);
  }

  return (
    <div className="pagination">
      <button
        className="pagination_previous"
        onClick={() => {
          paginate(currentPage--);
          setPageIncrase(false);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="pagination_number">
        {[...pageNumbers].length &&
          [...pageNumbers].slice(firstIndex, secondIndex).map((pageNumber) => (
            <div
              onClick={() => paginate(pageNumber)}
              key={pageNumber}
              className={
                pageNumber === currentPage ? "pagination_number-active" : ""
              }
            >
              {pageNumber}
            </div>
          ))}
      </div>
      <button
        className="pagination_next"
        onClick={() => {
          paginate(currentPage++);
          setPageIncrase(true);
        }}
        disabled={perPage > dataLength || total - currentPage * perPage === 0}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
