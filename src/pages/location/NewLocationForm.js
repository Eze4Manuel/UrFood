import React from 'react';
import './NewLocationForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import config from '../../assets/utils/config';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';

const UserForm = (props = { onSubmit: null, onHide: null, show: false}) => {
    const [values, setValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <Dialog header="New Location" visible={props.show} modal onHide={() => props.onHide()} style={{width: "40vw"}}>
            <div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div> 
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="name">Location Name</label><br />
                            <InputText style={{width: '100%'}} id="name" name="name" onChange={e => setValues(d => ({...d, name: e.target.value}))} autoFocus value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="location name" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="city">City</label><br />
                            <InputText style={{width: '100%'}} id="city" name="city" type="text" onChange={e => setValues(d => ({...d, city: e.target.value}))} value={values?.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                        </div>
                    </div>
                </div>                 
                <div className="user-form__button-wp">
                    <Button onClick={() => props.onSubmit({...values}, setLoading, setError, setValues, config.userData)} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Create"/>
                </div>  
            </div>
        </Dialog>
    )
}

export default UserForm;
