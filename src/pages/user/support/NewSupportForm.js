import React from 'react';
import './NewSupportForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { InputTextarea } from 'primereact/inputtextarea';

const UserForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const footer = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 6 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <Dialog header="New Acccount" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "40vw" }}>
            <div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div>
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="first_name">First Name*</label><br />
                            <InputText style={{ width: '100%' }} id="first_name" name="first_name" onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} autoFocus value={values.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="first name" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="last_name">Last Name*</label><br />
                            <InputText style={{ width: '100%' }} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({ ...d, last_name: e.target.value }))} value={values.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="last name" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="email">Email*</label><br />
                            <InputText style={{ width: '100%' }} id="email" name="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} autoFocus value={values.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="phone_number">Phone number*</label><br />
                            <InputText style={{ width: '100%' }} id="phone_number" name="phone_number" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="area">Area</label><br />
                            <InputText style={{ width: '100%' }} id="area" name="area" onChange={e => setValues(d => ({ ...d, area: e.target.value }))} value={values.area} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="address">Address</label><br />
                            <InputTextarea  style={{width: '100%', height: '80px'}} id="address" name="address" onChange={e => setValues(d => ({...d, address: e.target.value}))} value={values?.address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="address" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="username">Username*</label><br />
                            <InputText id="username" name="username" type="text" onChange={e => setValues(d => ({ ...d, username: e.target.value }))} value={values.username} className="p-inputtext-sm" placeholder="username" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="password">Password*</label><br />
                            <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values.password} className="p-inputtext-sm" placeholder="password" toggleMask />
                        </div>
                    </div>
                </div>
                <div className="user-form__button-wp">
                    <Button onClick={() => props.onSubmit({ ...values, user_type: 'attendant' }, setLoading, setError, setValues, config.userData)} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                </div>
            </div>
        </Dialog>
    )
}

export default UserForm;
