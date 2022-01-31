import React, { Fragment } from 'react';
import './FoodUserData.css';

const FoodUserDetail = ({ data }) => {
    console.log(data);
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Food Details</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.name}</span></p>
                <p className="user-info__detail"><span>Food ID</span> <span>{data?._id}</span></p>
                <p className="user-info__detail"><span>Ingredients</span> <span>{data?.ingredients ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Description</span> <span>{data?.description ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Listing Status</span> <span>{data?.listing_status?.toString()}</span></p>
                <p className="user-info__detail"><span>Listing Status</span> <span>{data?.listing_status?.toString()}</span></p>
            </div>
        </Fragment>
    )
}

export default FoodUserDetail
