import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import config from '../../assets/utils/config';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import './EditLocationForm.css';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../core/func/Helpers';

const EditLocationForm = ({ data, show, onHide, onAreaUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        setError("")
        let builder = {}
        // check first name
        if (values.name !== data.name) {
            builder.name = values.name
        }
        // check last name
        if (values.city !== data.city) {
            builder.city = values.city
        }

        if (Object.keys(builder).length === 0) {
            return setError("No changes to update")
        }

        // update
        setLoading(true)
        let reqData = await lib.updateArea(data?._id, builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues(reqData.data);
            onAreaUpdate(reqData.data)
        }
    }

    return show ? (
        <div className="container px-5">
            <h6 className="mb-1 mt-3">Update Area</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="name">Area Name</label><br />
                        <InputText style={{ width: '100%' }} id="name" name="name" onChange={e => setValues(d => ({ ...d, name: e.target.value }))} autoFocus value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Area name" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="city">City</label><br />
                        <InputText style={{ width: '100%' }} id="city" name="city" type="text" onChange={e => setValues(d => ({ ...d, city: e.target.value }))} value={values?.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                    </div>
                </div>
            </div>
             
            <div className="user-form__button-wp">
                <Button onClick={() => onSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Update" />
            </div>
        </div>
    ) : null
}

export default EditLocationForm
