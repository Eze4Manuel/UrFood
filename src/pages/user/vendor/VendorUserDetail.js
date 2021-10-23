import React, { Fragment } from 'react';
import './VendorUserData.css';

const VendorUserDetail = ({ data }) => {
    let vendor = data?.vendor_data
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Vendor Details</h6>
                 <p className="user-info__detail"><span>Vendor ID</span> <span>{data?.vendor_id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Vendor Name</span> <span>{vendor?.name}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{data?.area}</span></p>
                <p className="user-info__detail"><span>City</span> <span>{data?.city}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{data?.address}</span></p>
                <p className="user-info__detail"><span>CAC Number</span> <span>{vendor?.registration_id}</span></p>
            </div>
            
        </Fragment>
    )
}

export default VendorUserDetail
