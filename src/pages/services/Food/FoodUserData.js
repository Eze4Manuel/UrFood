import React, { useEffect } from 'react';
import './FoodUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import FoodUserDetail from './FoodUserDetail';
import EditFoodForm from './EditFoodForm';
import Flash from '../../../components/flash/Flash';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const FoodUserData = ({ data, show, onHide, onDeleted }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPartner, setShowPartner] = React.useState(true);
    const [, setShowProfile] = React.useState(false);
    const [, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPartner = () => {
        setShowPartner(true)
        setShowPassword(false)
        setShowProfile(false)
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
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Food deleted' })
        }
    }
    
    return (
        <Dialog closeOnEscape header={'Food'} visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <div className="partner-info__ctn">
                <div className="partner-info__btn-action-wp">
                    <div className="partner-info__btn-action">
                        <button onClick={() => onEditPartner()} className="btn btn__edit-ctn btn-action__green">Update Food</button>
                        <button onClick={() => setDelWarning(true)} className="btn btn__edit-ctn btn-action__red">Delete</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        {error ? <ErrorMessage message={error} /> : null}
                        <div className="partner-form__button-wp">
                            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                        </div>
                        <FoodUserDetail data={values} onHide={onHide} />
                    </div>
                    <div className="col-5">
                        
                        {/* EDIT Food PROFILE */}
                        <EditFoodForm onUpdated={(data) => setValues(data)} onHide={() => onCancelProfileEdit()} data={values} show={showPartner} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default FoodUserData
