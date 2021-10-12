import React from 'react';
import './Style.css';

export const SearchBar = (props) => {
    return (
        <div className="input-group mb-3 w-3 ml-4 pt-3">
                <input 
                    value={props.searchInput}
                    onChange={e => props.onChangeInput(e.target.value)}
                    type="search" 
                    className="form-control search-input ml-3" 
                    placeholder={props.searchPlaceholder} 
                    aria-label={props.ariaLabel} 
                    aria-describedby={props.ariaDescription} 
                />
                <span onClick={() => typeof props.onSearch === 'function' ? props.onSearch() : {}}
                    className="las la-search input-group-text btn btn-sm" 
                    id={props.searchID}>
                </span>
            </div>
    )
}

export default SearchBar;
