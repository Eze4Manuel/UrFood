import React from 'react';
import './NewCustomerForm.css';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';

const EditPharmacy = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const getFormData = (data) => {
        let customers = data?.customers_data || {}
        return {
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            phone_number: data?.phone_number || '',
            email: data?.email || '',
            customers_name: customers?.name || '',
            registration_id: customers?.registration_id || '',
            auth_id: data?.auth_id || '',
            area: data?.area || '',
            city: data?.city || '',
            address: data?.address || '',
        }
    }

    React.useEffect(() => {
        setValues(getFormData(data))
    }, [data])

    const handleSubmit = async () => {
        let builder = formValidator.validateCustomerUpdate(values, getFormData(data), {}, data, setError)
        if (!builder) {
            return
        }
        builder.user_id = data?.auth_id
        // update
        setLoading(true)
        let reqData = await lib.updateCustomer(builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data, customers_data: { ...data.customers_data, name: reqData.data.name, registration_id: reqData.data.registration_id } })
            onUpdated({ ...data, ...reqData.data, customers_data: { ...data.customers_data, name: reqData.data.name, registration_id: reqData.data.registration_id } })
        }
    }



    return show ? (
        <div className="container px-5">
            <div className="mb-4 mt-4"><h6>Update Customer</h6></div>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}

            <div className="row">
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="first_name">First Name*</label><br />
                        <InputText style={{ width: '100%' }} id="first_name" name="first_name" type="text" onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} value={values?.first_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="first name" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="last_name">Last Name*</label><br />
                        <InputText style={{ width: '100%' }} id="last_name" name="last_name" type="text" onChange={e => setValues(d => ({ ...d, last_name: e.target.value }))} value={values?.last_name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="last name" />
                    </div>
                </div>
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
                        <InputText style={{ width: '100%' }} id="area" name="area" type="text" onChange={e => setValues(d => ({ ...d, area: e.target.value }))} value={values?.area} className="p-inputtext-sm p-d-block p-mb-2" placeholder="area" />
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
            <div className="customers-form__button-wp">
                <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export default EditPharmacy;
