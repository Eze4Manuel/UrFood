import React from 'react';
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
import lib from './lib';
import helpers from '../../../core/func/Helpers';

const EditPharmacy = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const getFormData = (data) => {
        let partner = data?.partner_data || {}
        return {
            organization: partner?.organization,
            _id: data?._id || '',
            partner_id: partner._id || '',
            phone_number: partner?.phone_number || '',
            email: partner?.email || '',
            username: data?.username || '',
            auth_id: data?.auth_id || '',
            area: partner?.area || '',
            address: partner?.address || '',
            branch: partner?.branch || ''
        }
    }

    React.useEffect(() => {
        setValues(getFormData(data))
    }, [data])

    const handleSubmit = async () => {
        let builder = formValidator.validatePartnerUpdate(values, getFormData(data), {}, data, setError)
        if (!builder) {
            return
        }
        // update
        setLoading(true)
        let reqData = await lib.updatePharmacy(data?._id, builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data })
            onUpdated({ ...data, ...reqData.data })
        }

    }



    return show ? (
        <div className="container px-5">
            <div className="mb-4 mt-4"><h6>Update Partner</h6></div>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="organization">Organization name*</label><br />
                        <InputTextarea style={{ width: '100%', height: '60px' }} id="organization" name="organization" onChange={e => setValues(d => ({ ...d, organization: e.target.value }))} autoFocus value={values?.organization} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Organization Name" />
                    </div>
                </div>
            </div>
            <div className="row">
                {/* FIRST NAME */}
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="branch">Branch Name</label><br />
                        <InputText style={{ width: '100%' }} id="branch" name="branch" onChange={e => setValues(d => ({ ...d, branch: e.target.value }))} value={values?.branch} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="branch" />
                    </div>
                </div>
                {/* LAST NAME */}
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
                        <label htmlFor="username">Username</label><br />
                        <InputText style={{ width: '100%' }} id="username" name="username" onChange={e => setValues(d => ({ ...d, username: e.target.value }))} value={values?.username} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="username" />
                    </div>
                </div>
            </div>
            <div className="row">
                {/* AREA */}
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
            <div className="partner-form__button-wp">
                <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export default EditPharmacy;
