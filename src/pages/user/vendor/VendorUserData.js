import React, { useEffect } from 'react';
import './VendorUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import { EditPassword } from './EditVendorForm';
import VendorUserDetail from './VendorUserDetail';
import EditVendor from './EditVendor';
import Flash from '../../../components/flash/Flash';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const VendorUserData = ({ data, show, onHide, onDeleted, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPartner, setShowPartner] = React.useState(true);
    const [, setShowProfile] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPassword = () => {
        setShowPartner(false)
        setShowProfile(false)
        setShowPassword(true)
    }

    const onEditPartner = () => {
        setShowPartner(true)
        setShowPassword(false)
        setShowProfile(false)
    }

    const onCancelPasswordEdit = () => {
        setShowPassword(false)
        setShowProfile(false)
        setShowPartner(true)
    }

    const onCancelProfileEdit = () => {
        setShowPassword(false)
        setShowProfile(false)
        setShowPartner(true)
    }

    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.delete(data?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?.auth_id)
            onHide()
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Vendor deleted' })
        }
    }

    
    
    return (
        <Dialog closeOnEscape header={'Partner'} visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <div className="partner-info__ctn">
                <div className="partner-info__btn-action-wp">
                    <div className="partner-info__btn-action">
                        <button onClick={() => onEditPartner()} className="btn btn__edit-ctn btn-action__green">Update Vendor Profile</button>
                        <button onClick={() => onEditPassword()} className="btn btn__edit-ctn btn-action__green">Change password</button>
                        <button onClick={() => setDelWarning(true)} className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>m
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        {error ? <ErrorMessage message={error} /> : null}
                        <div className="partner-form__button-wp">
                            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                        </div>
                        <VendorUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        
                        {/* EDIT Vendor PROFILE */}
                        <EditVendor onUpdated={(data) => setValues(data)} onHide={() => onCancelProfileEdit()} data={values} show={showPartner} />
                        {/* EDIT PASSWORD */}
                        <EditPassword onHide={() => onCancelPasswordEdit()} data={values} show={showPassword} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default VendorUserData
