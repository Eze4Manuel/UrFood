import React, { useEffect } from 'react';
import './PricingUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import EditPricingForm from './EditPricingForm';
import PricingUserDetail from './PricingUserDetail';
import Flash from '../../components/flash/Flash';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../core/func/Helpers';
import ErrorMessage from '../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';

const deleteWarning = "Are you sure you want to delete this pricing. This action is not reversible."

const PricingUserData = ({ data, show, onHide, onDeleted, onUpdate }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, ] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data !== null ? data[0]:[]);
        setDelWarning(false)
    }, [data])

    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.delete(values?._id, user?.token);

        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Pricing deleted' })
            onDeleted(values?._id)
            onHide()
        }
    }

    return (
        <Dialog closeOnEscape header="Pricing Profile" visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <div className="user-info__ctn">
                <div className="user-info__btn-action-wp">
                    <div className="user-info__btn-action">
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
                        <PricingUserDetail data={values} />
                    </div>
                    <div className="col-5">
                        {/* EDIT PROFILE */}
                        <EditPricingForm onHide={onHide} data={values} show={!showPassword} onUpdate={onUpdate} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default PricingUserData
