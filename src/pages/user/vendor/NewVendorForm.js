import React, { useState, useRef } from 'react';
import './NewVendorForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { Skeleton } from 'primereact/skeleton';
import { useAuth } from '../../../core/hooks/useAuth';
import lib from './lib';

const NewVendorForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const { set, user } = useAuth();

    let loadLazyTimeout = useRef(null);

    const onLazyItemChange = (e) => {
        setSelectedItem2(e.value);
        setValues({ ...values,  area: e.value});
    }

    const onLazyLoad = (event) => {
        setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }
        //imitate delay of a backend call
        loadLazyTimeout =  setTimeout(async () => {
            const _lazyItems = [...lazyItems];
            let reqData = await lib.getAreas(user?.token)
            if (reqData.status === "ok") {
                console.log(reqData);
                reqData.data.forEach((element, ind) => {
                    _lazyItems[ind] = { label: `${element.display_name}`, value: `${element.display_name}` } 
                });
            }
            setLazyItems(_lazyItems);
            setLazyLoading(false);
        }, Math.random() * 1000 + 250);
    }

    const areas = [
        { name: 'Area 1', code: 'area 1' },
        { name: 'Asokoro', code: 'asokoro' },
        { name: 'Bamburu', code: 'bamburu' },
        { name: 'Dawaki', code: 'dawaki' },
        { name: 'Dustse alaji', code: 'dustse alaji' },
        { name: 'Garki', code: 'garki' },
        { name: 'Gwagwalada', code: 'gwagwalada' },
        { name: 'Gwarinpa', code: 'gwarinpa' },
        { name: 'Gudu', code: 'gudu' },
        { name: 'Jabi', code: 'jabi' },
        { name: 'Jikwoyi', code: 'jikwoyi' },
        { name: 'Katampe', code: 'katampe' },
        { name: 'Katampe extension', code: 'katampe extension' },
        { name: 'Karshi', code: 'karshi' },
        { name: 'Kubwa', code: 'kubwa' },
        { name: 'Kurunduma', code: 'kurunduma' },
        { name: 'Life camp', code: 'life camp' },
        { name: 'Mararaba', code: 'mararaba' },
        { name: 'Masaka', code: 'masaka' },
        { name: 'Nyanya', code: 'nyanya' },
        { name: 'Utako', code: 'utako' },
        { name: 'Wuse', code: 'wuse' },
        { name: 'Wuse 2', code: 'wuse 2' },
        { name: 'Yoba', code: 'yoba' },
        { name: 'Zone 2', code: 'zone 2' },
        { name: 'Zone 4', code: 'zone 4' },
        { name: 'Zone 5', code: 'zone 5' },
        { name: 'Zone 6', code: 'zone 6' },
        { name: 'Zuba', code: 'zuba' }
    ];



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
        let builder = formValidator.validateNewVendor(values, {}, setError)
        if (!builder) {
            return
        }
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

 

    return (
        <Dialog header="New Vendor Acccount" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "45vw" }}>
            <div>

                <div className="mb-4"><h6>Vendor Information</h6></div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div>
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="first_name">First Name*</label><br />
                            <InputText style={{ width: '100%' }} id="first_name" name="first_name" onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} autoFocus value={values?.first_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="First Name" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="branch">Last Name*</label><br />
                            <InputText style={{ width: '100%' }} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({ ...d, last_name: e.target.value }))} value={values?.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Last Name" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="email">Email*</label><br />
                            <InputText style={{ width: '100%' }} id="email" name="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} autoFocus value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="phone_number">Phone number*</label><br />
                            <InputText style={{ width: '100%' }} id="phone_number" name="phone_number" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values?.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="080*********" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="vendor_name">Vendor Name*</label><br />
                            <InputText style={{ width: '100%' }} id="vendor_name" name="vendor_name" type="text" onChange={e => setValues(d => ({ ...d, vendor_name: e.target.value }))} value={values?.vendor_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Salihu" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="registration_id">CAC Number*</label><br />
                            <InputText style={{ width: '100%' }} id="registration_id" name="registration_id" type="text" onChange={e => setValues(d => ({ ...d, registration_id: e.target.value }))} value={values?.registration_id} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Salihu" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="city">Vendor Location City*</label><br />
                            <InputText style={{ width: '100%' }} id="city" name="city" type="text" onChange={e => setValues(d => ({ ...d, city: e.target.value }))} value={values?.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                        </div>
                    </div>
                    {/* AREA */}
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="area">Vendor Location Area*</label><br />
                            <Dropdown  id="pharmacy_area" name="pharmacy_area" style={{ width: '100%', height: '40px', lineHeight: '40px' }} value={selectedItem2} options={lazyItems} onChange={onLazyItemChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: lazyLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select Area" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="p-field mb-2">
                            <label htmlFor="address">Vendor Location Address*</label><br />
                            <InputTextarea style={{ width: '100%', height: '80px' }} id="address" name="address" onChange={e => setValues(d => ({ ...d, address: e.target.value }))} value={values?.address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="address" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="last_name">Password*</label><br />
                            <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values?.password} className="p-inputtext-sm" placeholder="new password" toggleMask />
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

export default NewVendorForm;
