import React, { useEffect } from 'react';
import './OrderDetail.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import OrderDetailSummary, { Details } from './OrderDetailSummary'
import Flash from '../../../components/flash/Flash';
import lib from './lib';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../../core/func/Helpers';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const OrderData = ({ data, show, onHide, onDeleted}) => {
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
        <Dialog closeOnEscape header="Order Details" visible={show} modal onHide={() => onHide()} style={{width: "70vw"}}>
            <div className="order-info__ctn">
                <div className="row">
                    <div className="col-8">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        <OrderDetailSummary data={values}/>
                    </div>
                    <div className="col-4">
                        <Details data={values}  />
                    </div> 
                </div>
            </div>
        </Dialog>
    )
}

export default OrderData
