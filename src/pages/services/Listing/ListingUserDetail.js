import React, { Fragment } from 'react';
import './ListingUserData.css';

const FoodUserDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Food List Details</h6>
                <p className="user-info__detail"><span>Price</span> <span>{data?.price}</span></p>
                <p className="user-info__detail"><span>Quantity</span> <span>{data?.quantity}</span></p>
                <p className="user-info__detail"><span>Rating</span> <span>{data?.rating ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Discount Amount</span> <span>{data?.discount_amount ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Discount type </span> <span>{data?.discount_type}</span></p>
                <p className="user-info__detail"><span>Availability Status </span> <span>{data?.availability_status}</span></p>
                <p className="user-info__detail"><span>Description </span> <span>{data?.description}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Food Details</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.food.name}</span></p>
                <p className="user-info__detail"><span>Food ID</span> <span>{data?.food._id}</span></p>
                <p className="user-info__detail"><span>Ingredients</span> <span>{data?.food.ingredients ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Listing Status</span> <span>{data?.food.listing_status?.toString()}</span></p>
                <p className="user-info__detail"><span>Description</span> <span>{data?.food.description ?? 'N/A'}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Vendor Details</h6>
                <p className="user-info__detail"><span>Name</span> <span>{data?.vendor.name}</span></p>
                <p className="user-info__detail"><span>Vendor ID</span> <span>{data?.vendor._id}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.vendor.phone_number}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.vendor.email ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>City</span> <span>{data?.vendor.city ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Area</span> <span>{data?.vendor.area ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Address</span> <span>{data?.vendor.address ?? 'N/A'}</span></p>
                <p className="user-info__detail"><span>Registration ID</span> <span>{data?.vendor.registration_id?.toString()}</span></p>
            </div>
        </Fragment>
    )
}

export default FoodUserDetail
