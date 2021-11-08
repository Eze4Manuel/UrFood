import React, { useState } from 'react';
import './NewSupportForm.css';
import { Button } from 'primereact/button';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';

const EditSupport = ({ data, show, onHide, onUpdated, onExit}) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [, setSupportAuth] = useState('');
    const [selectedSupport, setSelectedSupport] = useState(null);
    const [supportData, setSupportData] = useState(null);
    const [lazySupportItems, setLazySupportItems] = useState([]);
    const [lazySupportLoading, setLazySupportLoading] = useState(false);

    React.useEffect(() => {
        setValues(data)
    }, [data])

    const status = [
        { name: 'pending', code: '1' },
        { name: 'active', code: '2' },
        { name: 'resolved', code: '3' },
        { name: 'unresolved', code: '4' }
    ];

    const handleSubmit = async () => {
        let builder = formValidator.validateSupportUpdate(values, data, {}, data, setError)
        if (!builder) {
            return
        }
        builder.support_id = values._id
        // update
        setLoading(true)
        let reqData = await lib.updateSupport(builder, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data })
            onUpdated({ ...data, ...reqData.data })
            onExit();
        }
    }

    const onLazySupportChange = (e) => {
        setSelectedSupport(e.value);
        setSupportAuth(supportData?.find(val => {
            if (val.name === e.value) {
                setValues({ ...values, assigned_support_user: val.auth_id })
                return true;
            } else return false;
        }))
    }
    // support lazy loading
    const onLazySupportLoad = async (event) => {
        setLazySupportLoading(true);
        let reqData = await lib.getAdminSupports(user?.token)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            setLazySupportItems(reqData.data.map(e => e.name));
            setSupportData(reqData.data);
        }
        setLazySupportLoading(false);
    }
    
    return show ? (
        <div className="container px-5 dropdown-demo">
            <div className="mb-4 mt-4"><h6>Update support</h6></div>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}
        
            <div className="p-field mb-2">
                <label htmlFor="support">Select Support</label><br />
                <Dropdown value={selectedSupport} options={lazySupportItems} onChange={onLazySupportChange} virtualScrollerOptions={{
                    lazy: true, onLazyLoad: onLazySupportLoad, itemSize: 31, showLoader: true, loading: lazySupportLoading, delay: 250, loadingTemplate: (options) => {
                        return (
                            <div className="p-d-flex p-ai-center p-p-2" style={{ height: '21px' }}>
                                <Skeleton width={options.even ? '80%' : '70%'} height="1rem" />
                            </div>
                        )
                    }
                }} placeholder="Select support" />
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="status">Status</label><br />
                        <Dropdown id="status" name="status" value={values?.status} options={status} onChange={e => setValues(d => ({ ...d, status: e.target.value }))} optionLabel="name" placeholder="Select status" />
                    </div>
                </div>
            </div>

            <div className="support-form__button-wp">
                <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export default EditSupport;
