import React, { useRef, useState } from 'react';
import './NewDispatcherForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidator';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { InputTextarea } from 'primereact/inputtextarea';
import { useAuth } from '../../../core/hooks/useAuth';
import lib from './lib';


const UserForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const { set, user } = useAuth();
    const [selectedItem2, setSelectedItem2] = useState(null);
    let loadLazyTimeout = useRef(null);


    const onLazyItemChange = (e) => {
        setSelectedItem2(e.value);
        setValues({ ...values, area: e.value });
    }

    const onLazyLoad = (event) => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(async () => {
            const _lazyItems = [...lazyItems];
            let reqData = await lib.getAreas(user?.token)
            setLoading(false)
            if (reqData.status === "ok") {
                reqData.data.forEach((element, ind) => {
                    _lazyItems[ind] = { label: `${element.name}`, value: `${element.name}` }
                });
            }
            setLazyItems(_lazyItems);
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    }
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

    const handleSubmit = () => {
        // validation
        let builder = formValidator.validateNewDispatcher(values, {}, setError)
        if (!builder) {
            return
        }
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

    return (
        <Dialog header="New Acccount" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "50vw" }}>
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
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="vehicle_type">Type of vehicle*</label>
                            <span className="small font-weight-bold">Options are motorbike, car, bus or truck</span>
                            <br />
                            <InputText style={{ width: '100%' }} id="vehicle_type" name="vehicle_type" onChange={e => setValues(d => ({ ...d, vehicle_type: e.target.value }))} autoFocus value={values.vehicle_type} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="vehicle type" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="vehicle_id">Vehicle ID*</label><br />
                            <InputText style={{ width: '100%' }} id="vehicle_id" name="vehicle_id" onChange={e => setValues(d => ({ ...d, vehicle_id: e.target.value }))} value={values.vehicle_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="FKJ-254XA" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="license_id">License ID*</label><br />
                            <InputText style={{ width: '100%' }} id="license_id" name="license_id" type="text" onChange={e => setValues(d => ({ ...d, license_id: e.target.value }))} value={values.license_id} className="p-inputtext-sm p-d-block p-mb-2" placeholder="AKW06968AA2" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="phone_number">Phone number</label><br />
                            <InputText style={{ width: '100%' }} id="phone_number" name="phone_number" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="home_area">Home Area</label><br />
                            <Dropdown id="home_area" name="home_area" style={{ width: '100%', height: '40px', lineHeight: '40px' }} value={selectedItem2} options={lazyItems} onChange={onLazyItemChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select Home Area" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="p-field mb-1">
                            <label htmlFor="home_address">Home Address</label><br />
                            <InputTextarea style={{ width: '100%', height: '100px' }} id="home_address" name="home_address" onChange={e => setValues(d => ({ ...d, address: e.target.value }))} value={values?.home_address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Home address" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="username">username</label><br />
                            <InputText style={{ width: '100%' }} id="username" name="username" onChange={e => setValues(d => ({ ...d, username: e.target.value }))} value={values.username} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="username" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="last_name">Password</label><br />
                            <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values.password} className="p-inputtext-sm" placeholder="new password" toggleMask />
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

export default UserForm;
