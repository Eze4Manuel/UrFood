import React, { Fragment } from 'react';
import './VendorUserData.css';

const PartnerUserDetail = ({ data }) => {

    let partner = data?.partner_data

    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Partner Details</h6>
                <p className="user-info__detail"><span>Organization Name</span> <span>{partner?.organization}</span></p>
                <p className="user-info__detail"><span>Branch Name</span> <span>{partner?.branch}</span></p>
                <p className="user-info__detail"><span>Partner ID</span> <span>{partner?._id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{partner?.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{partner?.email}</span></p>
                <p className="user-info__detail"><span>Username</span> <span>{data?.username}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{partner?.area}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{partner?.address}</span></p>
            </div>
            
        </Fragment>
    )
}

export default PartnerUserDetail
