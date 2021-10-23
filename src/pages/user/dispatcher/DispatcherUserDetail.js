import React, { Fragment } from 'react';
import './DispatcherUserData.css';

const DispatcherUserDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Personal Information</h6>
                <p className="user-info__detail"><span>First Name</span> <span>{data?.first_name}</span></p>
                <p className="user-info__detail"><span>Last Name</span> <span>{data?.last_name}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Contact Information</h6>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Phone</span> <span>{data?.phone_number}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">Account Information</h6>
                <p className="user-info__detail"><span>Account</span> <span>{data?.user_type}</span></p>
                <p className="user-info__detail"><span>Vehicle ID</span> <span>{data?.dispatcher_data?.vehicle_id}</span></p>
                <p className="user-info__detail"><span>License ID</span> <span>{data?.dispatcher_data?.license_id}</span></p>
                <p className="user-info__detail"><span>Vehicle</span> <span>{data?.dispatcher_data?.vehicle_type}</span></p>
            </div>
        </Fragment>
    )
}
export default DispatcherUserDetail