import React from 'react';
import "./spinner.css";

const Spinner = (props) => {
    return (
        //  <div className={"loader-wrapper"}>

        
        <div className="d-flex justify-content-center align-items-center vh-100" style={{opacity: 0.3}}>
            <div className="spinner-border" style={{opacity: 0.3}} role="status">
                {/* <span className="visually-hidden">Loading Record creation going on ...</span> */}
               
            </div>
            <span >  </span>
            <span > {props.name} </span>
        {/* </div> */}
         </div>
    )
}

export default Spinner;
