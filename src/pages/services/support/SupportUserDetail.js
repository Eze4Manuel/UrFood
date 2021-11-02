import React, { Fragment } from 'react';
import './SupportUserData.css';

const SupportUserDetail = ({ data }) => {
    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Support Details</h6>
                 <p className="user-info__detail"><span>Support ID</span> <span>{data?._id}</span></p>
                <p className="user-info__detail"><span>Title</span> <span>{data?.title}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Comment</span> <span>{data?.comment}</span></p>
                <p className="user-info__detail"><span>Support Type</span> <span>{data?.support_type}</span></p>
                <p className="user-info__detail"><span>Status</span> <span>{data?.status}</span></p>
            </div>
        </Fragment>
    )
}

export default SupportUserDetail
