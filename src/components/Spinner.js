import React from "react";
import spinnerGif from "../images/spinner.gif";

const Spinner = () => {
    return (
        <>
            <div className="spinner_div">
                <img src={spinnerGif} alt="Loading..." />
            </div>
        </>
    );
};

export default Spinner;
