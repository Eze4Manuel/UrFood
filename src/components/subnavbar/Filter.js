import React from 'react';
import './Style.css';

const styles = {
    filter: {
        color: "#3bb75e", 
        marginBottom: 4, 
        marginRight: 4
    }
}

const capsFirstLetter = (val) => val[0].toUpperCase()+val.substr(1);

export const Filter = (props) => (
    <div className="subnavbar-filter ml-4 mb-1">
        <span className="las la-filter" style={styles.filter}></span>
        <label className="subnavbar-filter-label" for={props.filterName}>Filter By: </label>
        <select 
            onChange={(e) => typeof props.onSelectChange === 'function' ? props.onSelectChange(e.target.value) : {}} value={props.option} 
            className="subnavbar-filter-list" 
            id={props.filterName} 
            name={props.filterName}
        >
            {props.filterList.map((opt, idx) => (
                <option 
                    key={opt+idx} 
                    className="subnavbar-filter-list-item text-capitalize" 
                    name={opt}
                >
                    {capsFirstLetter(opt)}
                </option>
            ))}
        </select>
    </div>
)

export default Filter;