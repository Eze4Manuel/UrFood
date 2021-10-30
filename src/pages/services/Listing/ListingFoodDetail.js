import React, { Fragment } from 'react';
import './ListingUserData.css';

const ListingFoodDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Listing Details</h6>
                <p className="user-info__detail"><span>Price</span> <span>{data?.price}</span></p>
                <p className="user-info__detail"><span>Quantity</span> <span>{data?.quantity}</span></p>
                <p className="user-info__detail"><span>Rating</span> <span>{data?.rating ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Discount Amount</span> <span>{data?.discount_amount ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Discount type </span> <span>{data?.discount_type}</span></p>
                <p className="user-info__detail"><span>Availability Status </span> <span>{data?.availability_status.toString()}</span></p>
                <p className="user-info__detail"><span>Description </span> <span>{data?.description}</span></p>
            </div>
        </Fragment>
    )
}

export default ListingFoodDetail
