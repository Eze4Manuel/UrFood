import React from 'react';
import './Style.css';

export const SearchBarButton = (props) => {
    return (
        <div className="mr-3">
            <button 
                onClick={() => typeof props.onAddItem === "function" ? props.onAddItem() : {}} 
                className="btn btn-success btn-sm">
                <span className="las la-plus"></span> 
                {props.buttonTitle} 
            </button>
        </div>
    )
}

export default SearchBarButton;