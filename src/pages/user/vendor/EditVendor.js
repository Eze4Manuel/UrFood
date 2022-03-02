import React, { useState, useRef } from 'react';
import './NewVendorForm.css';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import lib from './lib';
import helpers from '../../../core/func/Helpers';

const EditVendor = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const [lazyItems, setLazyItems] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);

    const getFormData = (data) => {
        let vendor = data?.vendor_data || {}
        return {
            phone_number: vendor?.phone_number || '',
            email: vendor?.email || '',
            vendor_name: vendor?.name || '',
            registration_id: vendor?.registration_id || '',
            auth_id: vendor?.auth_id || '',
            area: vendor?.area || '',
            city: vendor?.city || '',
            address: vendor?.address || '',
        }
    }

    React.useEffect(() => {
        setValues(getFormData(data))
    }, [data])

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

    const handleSubmit = async () => {
        let builder = formValidator.validateVendorUpdate(values, getFormData(data), {}, data, setError)
        if (!builder) {
            return
        }
        builder.vendor_id = data?.vendor_id;

        // update
        setLoading(true)
        let reqData = await lib.updateVendor( builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            console.log(reqData.data);
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data, vendor_data: {...data.vendor_data, name: reqData.data.name, registration_id: reqData.data.registration_id } })
            onUpdated({ ...data, ...reqData.data,  vendor_data: {...data.vendor_data, name: reqData.data.name, registration_id: reqData.data.registration_id, area: reqData.data.area } })
        }
    }



    return show ? (
        <div className="container px-5">
            <div className="mb-4 mt-4"><h6>Update vendor</h6></div>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
             
            <div className="row">
                 
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="phone_number">Phone*</label><br />
                        <InputText style={{ width: '100%' }} id="phone_number" name="phone_number" type="text" onChange={e => setValues(d => ({ ...d, phone_number: e.target.value }))} value={values?.phone_number} className="p-inputtext-sm p-d-block p-mb-2" placeholder="080********90" />
                    </div>
                </div>
            </div>
            {/* EMAIL */}
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="email">Email</label><br />
                        <InputText style={{ width: '100%' }} id="email" name="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="vendor_name">Vendor Name</label><br />
                        <InputText style={{ width: '100%' }} id="vendor_name" name="vendor_name" onChange={e => setValues(d => ({ ...d, vendor_name: e.target.value }))} value={values?.vendor_name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Vendor Name" />
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="registration_id">CAC Number</label><br />
                        <InputText style={{ width: '100%' }} id="registration_id" name="registration_id" onChange={e => setValues(d => ({ ...d, registration_id: e.target.value }))} value={values?.registration_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="CAC Number" />
                    </div>
                </div>
            </div>
            <div className="row">
                {/* AREA */}
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="city">City</label><br />
                        <InputText style={{ width: '100%' }} id="city" name="city" type="text" onChange={e => setValues(d => ({ ...d, city: e.target.value }))} value={values?.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="area">Area</label><br />
                         <Dropdown  id="vendor_area" name="vendor_area" style={{ width: '100%', height: '40px', lineHeight: '40px' }} value={selectedItem2} options={lazyItems} onChange={onLazyItemChange} virtualScrollerOptions={{
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
                        <label htmlFor="address">Address</label><br />
                        <InputTextarea style={{ width: '100%', height: '80px' }} id="address" name="address" onChange={e => setValues(d => ({ ...d, address: e.target.value }))} value={values?.address} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="address" />
                    </div>
                </div>
            </div>
            <div className="vendor-form__button-wp">
                <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export default EditVendor;
