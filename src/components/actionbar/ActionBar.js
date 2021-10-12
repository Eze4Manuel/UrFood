import React from 'react';
import './ActionBar.css';
import Loader from 'react-loader-spinner';
// TODO: Work on
const ActionBar = () => {
    return (
        <div className="action-bar__ctn">
            <div className="action-bar__items">
                <button className="btn action-bar__btn"><Loader type="TailSpin" width={20} height={20} color="#fff" /><span className="ml-2">Delete</span></button>
                <button className="btn action-bar__btn"><Loader type="TailSpin" width={20} height={20} color="#fff" /><span className="ml-2">Edit</span></button>
                <button className="btn action-bar__btn"><Loader type="TailSpin" width={20} height={20} color="#fff" /><span className="ml-2">Delete</span></button>
                <button className="btn action-bar__btn"><Loader type="TailSpin" width={20} height={20} color="#fff" /><span className="ml-2">Delete</span></button>
                <button className="btn action-bar__btn"><Loader type="TailSpin" width={20} height={20} color="#fff" /><span className="ml-2">Delete</span></button>
            </div>
        </div>
    )
}

export default ActionBar
