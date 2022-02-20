import React, { Fragment } from 'react';
import './LocationUserData.css';

const LocationUserDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Personal Information</h6>
                <p className="user-info__detail"><span>Area ID</span> <span>{data?._id}</span></p>
                <p className="user-info__detail"><span>Area Name</span> <span>{data?.name}</span></p>
                <p className="user-info__detail"><span>Display Name</span> <span>{data?.display_name}</span></p>
                <p className="user-info__detail"><span>Location</span> <span>{data?.location_data.name}</span></p>

            </div>
           
        </Fragment>
    )
}

export default LocationUserDetail
