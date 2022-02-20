import React, { useEffect, useState } from 'react';
import './NewPricingForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { Dropdown } from 'primereact/dropdown';

import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';

const UserForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [pickup, setSelectedPickup] = useState(null);
    const [dropoff, setSelectedDropoff] = useState(null);
    const [locationData, setLocationData] = useState([]);
    const { set, user } = useAuth();
    const [page,] = useState(1); 

    useEffect(() => {
        (async () => {
            let reqData = await lib.getLocations(page, null, user?.token)

            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setLocationData(reqData.data?.map(elem => ({name: elem.name, code: elem._id})));
            }
        })()
    }, [user?.token, page, set])

    const onPickChange = (e) => {
        setValues({...values, pickup: e.value.code})
        setSelectedPickup(e.value);
    }
    const onDropoffChange = (e) => {
        setValues({...values, destination: e.value.code})
        setSelectedDropoff(e.value);
    }

    return (
        <Dialog header="New Pricing" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "40vw" }}>
            <div>
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
                            <InputText required style={{ width: '100%' }} id="amount" name="amount" onChange={e => setValues(d => ({ ...d, amount: e.target.value }), onPickChange)} autoFocus value={values?.amount} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="amount" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="pickup">Pickup *</label><br />
                            <Dropdown required style={{ width: '100%', height: "40px", lineHeight: "40px" }} value={pickup} options={locationData} onChange={e => setValues(d => ({ ...d, pickup: e.value.code })), onPickChange} optionLabel="name" placeholder="Select pickup" />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="p-field mb-2">
                            <label htmlFor="destination">Destination *</label><br />
                            <Dropdown required style={{ width: '100%', height: "40px", lineHeight: "40px" }} value={dropoff} options={locationData} onChange={e => setValues(d => ({ ...d, destination: e.value.code })), onDropoffChange}  optionLabel="name" placeholder="Select Destination" />
                        </div>
                    </div>
                </div>
                <div className="user-form__button-wp">
                    <Button onClick={() => props.onSubmit({ ...values }, setLoading, setError, setValues, {} )} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                </div>
            </div>
        </Dialog>
    )
}

export default UserForm;
