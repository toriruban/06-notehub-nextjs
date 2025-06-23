import ReactPaginate from 'react-paginate';
import css from '../Pagination/Pagination.module.css'

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }:PaginationProps ){
return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={ currentPage - 1 }
        pageRangeDisplayed={ 5 }
        marginPagesDisplayed={ 1 }
        pageCount={ totalPages }
        previousLabel="< previous"
        renderOnZeroPageCount={ null }
        containerClassName={ css.pagination }
        activeClassName={ css.active }
      />
)
}