import React from 'react';
import Global from '../../assets/styles/Global';


/**
 * Render message  
 * 
 * @param {{
 *  title: string;
 *  paragraph: string;
 * }} props 
 * @returns 
 */
const NoData = (props) => {
    return (
        <div style={Global.center}>
            <div style={{marginBottom: 25}}>
                <span className="las la-file-excel no-file"></span>
            </div>
            <div style={{...Global.center, ...{ width: '50%'}}}>
                <h5 className="text-center">{props.title}</h5>
                <p className="text-center small">{props.paragraph}</p>
            </div>
        </div>
    )
}
export default NoData;
