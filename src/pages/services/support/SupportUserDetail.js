import React, { Fragment } from 'react';
import './SupportUserData.css';

const SupportUserDetail = ({ data }) => {

     // transforms status code to status text
     const processStatus = (num) => {
        switch (num) {
            case 1:
                return 'pending';
            case 2:
                return 'active';
            case 3:
                return 'resolved';
            case 4:
                return 'unresolved';
            default:
                return num;
        }
    }

    return (
        <Fragment>
            <div className="my-3">
                <h6 className="mb-3">Support Details</h6>
                 <p className="user-info__detail"><span>Support ID</span> <span>{data?._id}</span></p>
                <p className="user-info__detail"><span>Title</span> <span>{data?.title}</span></p>
                <p className="user-info__detail"><span>Email</span> <span>{data?.email}</span></p>
                <p className="user-info__detail"><span>Comment</span> <span>{data?.comment}</span></p>
                <p className="user-info__detail"><span>Support Type</span> <span>{data?.support_type}</span></p>
                <p className="user-info__detail"><span>Status</span> <span>{processStatus(data?.status)}</span></p>
                <p className="user-info__detail"><span>Assigned Suppoert User</span> <span>{data?.support_user_name}</span></p>
            </div>
        </Fragment>
    )
}

export default SupportUserDetail
