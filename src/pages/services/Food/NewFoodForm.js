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

import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

const NewFoodForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [city,] = useState(null);
    const toast = useRef(null);


    const handleSubmit = () => {
        let builder = formValidator.validateNewFood(values, {}, setError)
        if (!builder) {
            return
        }
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

    const onUpload = () => {

        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
    const myUploader = (event) => {
        //event.files == files to upload
        console.log(event);
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
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <label htmlFor="city">Upload Image</label><br />
                        <div className="card">
                            <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
                                emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>}  customUpload uploadHandler={myUploader} />
                        </div>
                    </div>
                </div>



                <div className="partner-form__button-wp">
                    <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                </div>
            </div>
        </Dialog>
    )
}

export default NewFoodForm;
