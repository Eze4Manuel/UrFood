import React, { useEffect } from 'react';
import './TransactionDetail.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import TransactionDetailSummary, { Customer, Dispatcher, Pharmacy } from './TransactionDetailSummary'
import Flash from '../../components/flash/Flash';
import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const TransactionData = ({ data, show, onHide, onDeleted}) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [, setLoading] = React.useState(false);
    // const [showOrder, ] = React.useState(true);
    const [delWarning, setDelWarning] = React.useState(false);
    const [, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

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
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'Product deleted'})
        }
    }

    return (
        <Dialog closeOnEscape header="Transaction Details" visible={show} modal onHide={() => onHide()} style={{width: "60vw"}}>
            <div className="transaction-info__ctn">
                <div className="row">
                    <div className="col-8">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        <TransactionDetailSummary data={values} />
                    </div>
                    <div className="col-4">
                        <Customer data={values} />
                        <Dispatcher data={values} />
                        <Pharmacy data={values} />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default TransactionData
