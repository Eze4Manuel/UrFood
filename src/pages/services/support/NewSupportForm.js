import React, { useState } from 'react';
import './NewSupportForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { Skeleton } from 'primereact/skeleton';

const NewSupportForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { set, user } = useAuth();
    const [supportAuth, setSupportAuth] = useState('');
    const [selectedSupport, setSelectedSupport] = useState(null);
    const [supportData, setSupportData] = useState(null);
    const [lazySupportItems, setLazySupportItems] = useState([]);
    const [lazySupportLoading, setLazySupportLoading] = useState(false);

    const handleSubmit = () => {
        let builder = formValidator.validateNewSupport(values, {}, setError)
        if (!builder) {
            return
        }
        builder.auth_id = user.auth_id
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

    const supportType = [
        { name: 'faq', code: 'faq' },
        { name: 'help', code: 'help' },
    ];

    const status = [
        { name: 'pending', code: '1' },
        { name: 'active', code: '2' },
        { name: 'resolved', code: '3' },
        { name: 'unresolved', code: '4' }
    ];

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
    return (
        <Dialog header="New Support" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "45vw" }}>
            <div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div>
                {error ? <ErrorMessage message={error} /> : null}


                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="title">Title*</label><br />
                            <InputText style={{ width: '100%' }} id="title" name="title" onChange={e => setValues(d => ({ ...d, title: e.target.value }))} autoFocus value={values?.title} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Title" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="email">Email*</label><br />
                            <InputText style={{ width: '100%' }} id="email" name="email" onChange={e => setValues(d => ({ ...d, email: e.target.value }))} autoFocus value={values?.email} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="email" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 dropdown-demo">
                        <div className="p-field mb-1">
                            <label htmlFor="support_type"> Support Type</label><br />
                            <Dropdown id="support_type" name="support_type" value={values?.support_type} options={supportType} onChange={e => setValues(d => ({ ...d, support_type: e.target.value }))} optionLabel="name" placeholder="Select support" />
                        </div>
                    </div>
                    <div className="col-lg-6 dropdown-demo">
                        <div className="p-field mb-1">
                            <label htmlFor="status"> Status</label><br />
                            <Dropdown id="status" name="status"  value={values?.status} options={status} onChange={e => setValues(d => ({ ...d, status: e.target.value }))} optionLabel="name" placeholder="Select status" />
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-lg-6">
                         
                        <div className="p-field mb-2">
                            <label htmlFor="support">Assign support User</label><br />
                            <Dropdown style={{ width: '100%', height: '35px' }} value={selectedSupport} options={lazySupportItems} onChange={onLazySupportChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazySupportLoad, itemSize: 31, showLoader: true, loading: lazySupportLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="p-d-flex p-ai-center p-p-2" style={{ height: '21px' }}>
                                            <Skeleton width={options.even ? '80%' : '70%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select support" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="comment">Comment*</label><br />
                            <InputTextarea className="p-inputtext-sm p-d-block p-mb-2" id="comment" name="comment" type="text" onChange={e => setValues(d => ({ ...d, comment: e.target.value }))} value={values?.comment} />
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

export default NewSupportForm;
