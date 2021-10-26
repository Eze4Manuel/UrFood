import React, { Fragment } from 'react';
import './CustomerUserData.css';

const CustomerUserDetail = ({ data }) => {
    let vendor = data?.vendor_data
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Customer Details</h6>
                <p className="user-info__detail"><span>First Name</span> <span>{data?.first_name}</span></p>
                <p className="user-info__detail"><span>Last Name</span> <span>{data?.last_name}</span></p>
                <p className="user-info__detail"><span>Customer ID</span> <span>{data?.auth_id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{data?.area}</span></p>
                <p className="user-info__detail"><span>City</span> <span>{data?.city}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{data?.address}</span></p>
            </div>
            
        </Fragment>
    )
}

export default CustomerUserDetail
