import React, { Fragment } from 'react';

import lib from './lib';
import helpers from '../../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../../../core/hooks/useAuth';
import { FileUpload } from 'primereact/fileupload';

import './FoodUserData.css';

const FoodUserDetail = ({ data, onHide }) => {
    const [, setError] = React.useState(false);
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values,] = React.useState();
    const [loaded, setLoaded] = React.useState(false);
    const [uploaded, setUploaded] = React.useState('');


    const onBasicUpload = async (e) => {
        setLoaded(true)
        let payload = {
            file_name: e.files[0].name,
            file_type: e.files[0].type
        }
        let reqData = await lib.getPreSignedUrl(payload, user?.token);
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError);
        }
        if (reqData.status === 'ok') {
            let uploadData = await lib.uploadImage(reqData.data.signed_url, e.files[0]);
            if (uploadData.status === 'error') {
                helpers.sessionHasExpired(set, reqData?.msg, setError)
            } if (uploadData.statusText === 'OK') {
                let public_url = reqData.data.public_url;
                console.log({avatar: public_url });

               
                // update
                setTimeout(async ()=>{
                    let uploadData = await lib.updateFood({avatar: public_url }, data?._id, user?.token);
                console.log(values);
                console.log(uploadData);

                // error
                if (uploadData.status === 'error') {
                    helpers.sessionHasExpired(set, uploadData?.msg, setError)
                }
                if (uploadData.status === 'ok') {
                    helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Image Updated' })
                    setUploaded('Image Uploaded');
                    setLoaded(false);
                    onHide();
                }
                }, 2000)
                
            }
        }
    }
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
            <div style={{ 'width': "150px", height: "120px", backgroundImage: `url(${data?.avatar})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <div></div>
            </div>
            <div style={{ marginTop: "20px" }}>
                <span style={{ display: 'flex' }}>
                    <FileUpload chooseLabel={data?.avatar.length !== 0 ? "Change Image" : "Add Food Image"} className='fix_button' url="./upload" mode="basic" name="food_image" accept="image/*" customUpload={true} maxFileSize={1000000} uploadHandler={onBasicUpload} />
                    {loaded ? <ProgressSpinner style={{ width: '30px', height: '20px', margin: "10px" }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> : null}
                    {/* <Button onClick={handleImageEdit} label="Edit Image" className="p-button-success p-button-text" /> */}
                </span>
                <p style={{ fontSize: '12px' }}>{uploaded}</p>
            </div>
        </Fragment>
    )
}

export default FoodUserDetail
