import * as React from 'react'
import {useState} from 'react'

const Pagination = (props) => {

  const perPageDropdown = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
  ]

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateItems, setUpdateItems] = useState(false)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.questionsList.slice(startIndex, endIndex);

  if(updateItems){
    setTimeout(function(){
      props.setCurrentItems(currentItems);
      setUpdateItems(false);
    }, 10)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setUpdateItems(true);
  };

  const paginationButtons = [];
  const totalPages = Math.ceil(props.questionsList.length / itemsPerPage);

  if(currentPage > 3){
    paginationButtons.push(
      <div
        key={1}
        onClick={() => handlePageChange(1)}
        className={`first-page pagination-button${1 === currentPage ? ' active' : ''}`}>
        {1}
      </div>
    );
    paginationButtons.push(
      <span className="dots" key='more-to-first'>...</span>
    )
  }

  for (let page = currentPage - 2; page <= currentPage + 2; page++) {
    if(page > 0 && page < totalPages){
      paginationButtons.push(
        <div
          key={page}
          onClick={() => handlePageChange(page)}
          className={`pagination-button${page === currentPage ? ' active' : ''}`}>
          {page}
        </div>
      );
    }
  }

  if(currentPage < totalPages - 2){
    paginationButtons.push(
      <span className="dots" key='more-to-last'>...</span>
    )
    paginationButtons.push(
      <div
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`last-page pagination-button${totalPages === currentPage ? ' active' : ''}`}>
        {totalPages}
      </div>
    );
  }

  const updateItemsPerPage = (e) => {
    setCurrentPage(1);
    setItemsPerPage(e.target.value);
    setUpdateItems(true);
  }

  return(
    <div className="row">
      <div className="pagination-pages col-6">
        <p className="lead"> Page:</p>
        <div className="pagination">
          {paginationButtons}
        </div>
      </div>
      <div className="col-6">
        <p className="lead"> Per page:</p>
        <select className="form-select form-select-md" value={itemsPerPage} onChange={event => updateItemsPerPage(event)}>
          {perPageDropdown.map(perPage => (
            <option key={perPage.value} value={perPage.value}>
              {perPage.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Pagination