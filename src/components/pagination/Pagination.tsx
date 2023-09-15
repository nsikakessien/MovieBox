import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage)}
        className="bg-[#BE123C]"
      >
        {currentPage}
      </button>
      {currentPage + 1 <= totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </button>
      )}
      {currentPage + 2 <= totalPages && (
        <button onClick={() => onPageChange(currentPage + 2)}>
          {currentPage + 2}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
