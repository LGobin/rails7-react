import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Spinner = (props) => {
  return (
    <div>
      { props.showSpinner ?
        <div className="mt-3 d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : ''
      }
    </div>
  );
};

export default Spinner;