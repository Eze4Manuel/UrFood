import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import config from '../../assets/utils/config';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import './EditPricingForm.css';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../core/func/Helpers';
import './NewPricingForm.css';
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';

const EditPricingForm = ({ data, show, onHide, onUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [pickup, setSelectedPickup] = useState(null);
    const [dropoff, setSelectedDropoff] = useState(null);
    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        setValues(data);
    }, [data]);

    useEffect(() => {
        (async () => {
            let reqData = await lib.getLocations(1, null, user?.token)

            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setLocationData(reqData.data?.map(elem => ({ name: elem.name, code: elem._id })));
            }
        })()
    }, [user?.token, set])

    const onSubmit = async () => {
        setError("")
        let builder = {}

        // check name
        if (values.name !== data.name) {
            if (!values.name) {
                return setError("Name is empty")
            }
            builder.name = values.name
        }
        // check amount
        if (values.amount !== data.amount) {
            if (!values.amount) {
                return setError("Amount cannot be empty")
            }
            if (Number.isInteger(values.amount)) {
                return setError("Amount must be number")
            }
            builder.amount = values.amount
        }

        if (Object.keys(builder).length === 0) {
            return setError("No changes to update")
        }
        // update
        setLoading(true)
        let reqData = await lib.update(data?._id, builder, user?.token);
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues(reqData.data)
            onUpdate(reqData.data)
            onHide()
        }
    }

    const onPickChange = (e) => {
        setValues({ ...values, pickup: e.value.code })
        setSelectedPickup(e.value);
    }
    const onDropoffChange = (e) => {
        setValues({ ...values, destination: e.value.code })
        setSelectedDropoff(e.value);
    }

    return show ? (
        <div>
            <h6 className="mb-1 mt-3">Update Profile</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row">
                <div className="col-lg-6">
                    <div className="p-field mb-2">
                        <label htmlFor="name">Name *</label><br />
                        <InputText required style={{ width: '100%' }} id="name" name="name" onChange={e => setValues(d => ({ ...d, name: e.target.value }))} autoFocus value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="name" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-field mb-2">
                        <label htmlFor="amount">Amount *</label><br />
                        <InputText required style={{ width: '100%' }} id="amount" type='number' name="amount" onChange={e => setValues(d => ({ ...d, amount: e.target.value }))} autoFocus value={values?.amount} className="p-inputtext-sm p-d-block p-mb-2" placeholder="amount" />
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-lg-6">
                    <div className="p-field mb-2">
                        <label htmlFor="pickup">Pickup *</label><br />
                        <Dropdown required style={{ width: '100%', height: "40px", lineHeight: "40px" }} value={pickup} options={locationData} onChange={ onPickChange} optionLabel="name" placeholder="pickup" />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="p-field mb-2">
                        <label htmlFor="destination">Destination *</label><br />
                        <Dropdown required style={{ width: '100%', height: "40px", lineHeight: "40px" }} value={dropoff} options={locationData} onChange={ onDropoffChange} optionLabel="name" placeholder="Destination" />
                    </div>
                </div>
            </div> */}
            <div className="user-form__button-wp">
                <Button onClick={onSubmit} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Update" />
            </div>
        </div>
    ) : null
}

export default EditPricingForm
