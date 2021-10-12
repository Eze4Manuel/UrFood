import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * Component to navigate to previous page
 * 
 * @param {*} props 
 * @returns 
 */
const GoBack = (props) => {
    const history = useHistory();
    return (
        <div onClick={() => history.goBack()} className="white p-2">
           <span style={{fontSize: 25}} class="las la-arrow-left go-back-arrow"></span> 
        </div>
    )
}


export default GoBack
