import React from 'react';
import Loader from 'react-loader-spinner'
import './Loading.css';

export const ContainerLoader = () => {
    return (
        <div className="app-container-loading">
           <div className="app-container-loading__wp">
                <div className="app-container-loading__content">
                    <Loader
                        type="TailSpin"
                        color="green"
                        height={100}
                        width={100}
                    />
                </div>
           </div>
        </div>
    )   
}

const Loading = ({ height, width }) => {
    return (
        <div className="app-loading">
            <div className="app-loading__content">
                <Loader
                    type="TailSpin"
                    color="green"
                    height={height || 100}
                    width={width || 100}
                />
            </div>
        </div>
    )
}

export default Loading;
