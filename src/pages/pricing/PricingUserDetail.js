import React, { Fragment } from 'react';
import './PricingUserData.css';

const PricingUserDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Pricing Information</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.name}</span></p>
                <p className="user-info__detail"><span>Pickup</span> <span>{data?.pickup_data?.name}</span></p>
                <p className="user-info__detail"><span>Destination</span> <span>{data?.destination_data?.name}</span></p>
                <p className="user-info__detail"><span>Amount</span> <span>{data?.amount}</span></p>
            </div>
            
        </Fragment>
    )
}

export default PricingUserDetail
