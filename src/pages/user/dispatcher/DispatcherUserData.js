import React, { useEffect } from 'react';
import './DispatcherUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import EditDispatcherForm, { EditPassword, EditLicense } from './EditDispatcherForm';
import DispatcherUserDetail from './DispatcherUserDetail';
import Flash from '../../../components/flash/Flash';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const SupportUserData = ({ data, show, onHide, onDeleted }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showLicense, setShowLicense] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditProfile = () => {
        setShowLicense(false)
        setShowProfile(true)
        setShowPassword(false)
    }
    const onEditPassword = () => {
        setShowLicense(false)
        setShowProfile(false)
        setShowPassword(true)
    }
    const onEditLincense = () => {
        setShowProfile(false)
        setShowPassword(false)
        setShowLicense(true)
    }

    const onCancelLicenseEdit = () => {
        setShowLicense(false)
        setShowProfile(false)
        setShowProfile(true)
    }

    const onCancelPasswordEdit = () => {
        setShowPassword(false)
        setShowLicense(false)
        setShowProfile(true)
    }

    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.delete(values?.auth_id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?.auth_id)
            onHide()
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Dispatcher deleted' })
        }

    }

    return (
        <Dialog closeOnEscape header="User Profile" visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
                        <button onClick={() => onEditProfile()} className="btn btn__edit-ctn btn-action__green">Update profile</button>
                        <button onClick={() => onEditPassword()} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button onClick={() => onEditLincense()} className="btn btn__edit-ctn btn-action__green">Update licences</button>
                        <button onClick={() => setDelWarning(true)} className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        {error ? <ErrorMessage message={error} /> : null}
                        <div className="user-form__button-wp">
                            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                        </div>
                        <DispatcherUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditDispatcherForm onUpdate={data => setValues(data)} onHide={onHide} data={values} show={showProfile} />
                        {/* EDIT License */}
                        <EditLicense onUpdate={(data) => setValues(data)} onHide={() => onCancelLicenseEdit()} data={values} show={showLicense} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => onCancelPasswordEdit()} data={values} show={showPassword} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default SupportUserData
