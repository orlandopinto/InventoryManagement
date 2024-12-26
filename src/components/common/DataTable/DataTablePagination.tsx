import { SetStateAction, useEffect, Dispatch } from "react";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";

interface DataTablePaginationProps {
     itemsCount: number;
     itemsPerPage: number;
     currentPage: number;
     setCurrentPage: Dispatch<SetStateAction<number>>;
     alwaysShown?: boolean;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
     itemsCount = 0,
     itemsPerPage = 0,
     currentPage = 0,
     setCurrentPage,
     alwaysShown = true
}) => {

     const pagesCount = Math.ceil(itemsCount / itemsPerPage);
     const isPaginationShown = alwaysShown ? true : pagesCount > 1;
     const isCurrentPageFirst = currentPage === 1;
     const isCurrentPageLast = currentPage === pagesCount;
     const changePage = (number: number) => {
          if (currentPage === number) return;
          setCurrentPage(number);
     };
     const onPageNumberClick = (pageNumber: number) => {
          changePage(pageNumber);
     };

     const onPreviousPageClick = () => {
          if (currentPage <= 1) {
               const num = currentPage = 1;
               return (changePage(num));
          }
          else {
               changePage(currentPage - 1);
          }
     };

     const onNextPageClick = () => {
          changePage(currentPage + 1);
     };

     const setLastPageAsCurrent = () => {
          if (currentPage > pagesCount) {
               pagesCount && setCurrentPage(pagesCount);
          }
     };

     let isPageNumberOutOfRange = false;

     const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
          const pageNumber = index + 1;
          const isPageNumberFirst = pageNumber === 1;
          const isPageNumberLast = pageNumber === pagesCount;
          const isCurrentPageWithinTwoPageNumbers =
               Math.abs(pageNumber - currentPage) <= 2;

          if (
               isPageNumberFirst ||
               isPageNumberLast ||
               isCurrentPageWithinTwoPageNumbers
          ) {
               isPageNumberOutOfRange = false;
               return (
                    <Pagination.Item
                         activeLabel=""
                         key={pageNumber}
                         onClick={() => onPageNumberClick(pageNumber)}
                         active={pageNumber === currentPage}
                    >
                         {pageNumber}
                    </Pagination.Item>
               );
          }

          if (!isPageNumberOutOfRange) {
               isPageNumberOutOfRange = true;
               return <Pagination.Ellipsis key={pageNumber} className="muted" />;
          }
          return null;
     });

     useEffect(setLastPageAsCurrent, [pagesCount]);

     return (
          <>
               {isPaginationShown && (
                    <Pagination>
                         <Pagination.Prev
                              className={isCurrentPageFirst ? "disable" : ""}
                              onClick={onPreviousPageClick}
                              disabled={isCurrentPageFirst}
                         />
                         {pageNumbers}
                         <Pagination.Next
                              onClick={onNextPageClick}
                              disabled={isCurrentPageLast}
                              className={isCurrentPageLast ? "disable" : ""}
                         />
                    </Pagination>
               )}
          </>
     );
};

DataTablePagination.propTypes = {
     itemsCount: PropTypes.number.isRequired,
     currentPage: PropTypes.number.isRequired,
     setCurrentPage: PropTypes.func.isRequired,
     alwaysShown: PropTypes.bool
};

export default DataTablePagination;