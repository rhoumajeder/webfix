import React from 'react';

const Spinner = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border" role="status">
                {/* <span className="visually-hidden">Loading Record creation going on ...</span> */}
               
            </div>
            <span >  </span>
            <span > {props.name} </span>
        </div>
    )
}

export default Spinner;
