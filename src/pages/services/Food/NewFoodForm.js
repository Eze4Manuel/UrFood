import React, { useRef, useState } from 'react';
import './NewFoodForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useAuth } from '../../../core/hooks/useAuth';
import { Toast } from 'primereact/toast';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import { ProgressSpinner } from 'primereact/progressspinner';

const NewFoodForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [city,] = useState(null);
    const toast = useRef(null);
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [loaded, setLoaded] = React.useState(false);
    const [uploaded, setUploaded] = React.useState('');

    const handleSubmit = () => {
        console.log(values);

        let builder = formValidator.validateNewFood(values, {}, setError)
        if (!builder) {
            return
        }
        console.log(builder);
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

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
            console.log(reqData);
            let uploadData = await lib.uploadImage(reqData.data.signed_url, e.files[0]);
            if (uploadData.status === 'error') {
                helpers.sessionHasExpired(set, reqData?.msg, setError)
            } if (uploadData.statusText === 'OK') {
                console.log(uploadData);
                let public_url = reqData.data.public_url;
                setValues(d => ({ ...d, avatar: public_url }));
                setUploaded('Image Uploaded');
                setLoaded(false);
            }
        }
    }
    return (
        <Dialog header="New Food" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "45vw" }}>
            <Toast ref={toast}></Toast>
            <div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div>
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="first_name">Name*</label><br />
                            <InputText style={{ width: '100%' }} id="name" name="name" onChange={e => setValues(d => ({ ...d, name: e.target.value }))} autoFocus value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder=" Name" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="branch">Category*</label><br />
                            <InputText style={{ width: '100%' }} id="category" name="category" type="text" onChange={e => setValues(d => ({ ...d, category: e.target.value }))} value={values?.category} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Category" />
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="description">Description</label><br />
                            <InputTextarea style={{ width: '100%' }} id="description" name="description" onChange={e => setValues(d => ({ ...d, description: e.target.value }))} value={values?.description} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="description" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="city">Ingredients</label><br />
                            <InputText style={{ width: '100%' }} id="ingredients" name="ingredients" type="text" onChange={e => setValues(d => ({ ...d, ingredients: e.target.value }))} value={values?.ingredients} className="p-inputtext-sm p-d-block p-mb-2" placeholder="ingredients" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="city">Listing Status</label><br />
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="listing_status" name="listing_status" value="true" onChange={e => setValues(d => ({ ...d, listing_status: e.target.value }))} checked={city === 'True'} />
                            <label htmlFor="listing_status" style={{ "marginRight": "15px" }} >True</label>

                            <RadioButton inputId="listing_status" name="listing_status" value="false" onChange={e => setValues(d => ({ ...d, listing_status: e.target.value }))} checked={city === 'False'} />
                            <label htmlFor="listing_status">False</label>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h5 style={{ "fontSize": "14px" }}>Upload Image</h5>
                        {/* <input onChange={(e) => onBasicUpload(e)} type='file'  name="food_image" accept="image/*"  /> */}
                        <div style={{display: "flex", justifyContent: 'start'}}>
                            <FileUpload className='fix_button' url="./upload" mode="basic" name="food_image" accept="image/*" customUpload={true} maxFileSize={1000000} uploadHandler={onBasicUpload} />
                            {loaded ? <ProgressSpinner style={{ width: '30px', height: '20px', margin: "10px" }} strokeWidth="2" fill="var(--surface-ground)" animationDuration=".5s" /> : null}
                        </div>
                        <p style={{fontSize: '12px'}}>{uploaded}</p>
                    </div>
                </div>
                <div className="row">

                </div>
                <div className="partner-form__button-wp">
                    <Button disabled= {loaded ? true: false} onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                </div>
            </div>
        </Dialog>
    )
}

export default NewFoodForm;
