import React, { Fragment, useState } from 'react';
import { toNumber } from '../../../core/func/format';
import './OrderSummary.css';
import DashbaordTable from '../../../components/dashboardhelps/DashbaordTable';
import { ContainerLoader } from '../../../components/loading/Loading';
import lib from './lib';
import { SplitButton } from 'primereact/splitbutton';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../../core/func/Helpers';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ListBox } from 'primereact/listbox';

const Detail = ({ name, value }) => value ? (<p className="order-info__detail"><span>{name}</span> <span>{value}</span></p>) : null

export const Details = ({ data, updateAllData }) => {
    const { set, user } = useAuth();
    const [, setAllow] = useState(true);
    const [, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const notify = useNotifications();
    const [selectedDispatch,] = useState(null);
    const [, setAssigning] = useState(true);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [, setPosition] = useState('left');
    const [dispatchers, setDispatchers] = useState([]);

    const updateStatus = async (val) => {
        setLoader(true);
        let reqData = await lib.updateStauts(user?.token, data?._id, val)
        setLoader(false)
        if (reqData.status === 'ok') {
            data.status = val;
            setData(data);
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Order Updated' })
        } else {
            helpers.alert({ notifications: notify, icon: 'danger', color: 'red', message: reqData.msg })
        }
    }

    const assignDispatch = async () => {
        setLoader(true)
        let reqData = await lib.getDispatchers(user?.token, 'dispatcher');
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            setDispatchers(reqData.data);
            setDisplayPosition(true)
            setPosition('left');
        }
        setLoader(false);
    }

    const items = [
        {
            label: 'active',
            icon: 'pi pi-check',
            command: () => {
                updateStatus('active')
            }
        },
        {
            label: 'cancelled',
            icon: 'pi pi-times',
            command: () => {
                updateStatus('cancelled')
            }
        },
        {
            label: 'fulfilled',
            icon: 'pi pi-external-link',
            command: () => {
                updateStatus('fulfilled')
            }
        },

    ];

    const onHide = (name) => {
        setDisplayPosition(false);

    }

    const dispatchSelected = async (val) => {
        setLoader(true);
        setAssigning(false);
        // Fetches all available dispatchers
        let reqData = await lib.updateDispatcher(user?.token, data?.order_id, val?.auth_id);
        if (reqData.status === "error") {
            helpers.alert({ notifications: notify, icon: 'warning', color: 'yellow', message: 'Failed to Assign Dispatcher' })
        }
        if (reqData.status === 'ok') {
            // Updating current selected data
            data.dispatcher = val.dispatcher_data;
            data.status = reqData.data.status;
            setData(data);
            onHide();
            setAllow(true);
            // updateAllData(data);
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Dispatcher Assigned' })
        }
        setLoader(false);
        setAssigning(true);
    }



    return (
        <>
            <Dialog header="Header" visible={displayPosition} style={{ width: '30rem' }} onHide={() => onHide()}>
                <ListBox value={selectedDispatch} options={dispatchers} onChange={(e) => dispatchSelected(e.value)} optionLabel="username" style={{ width: '26.5vw', 'border': 'none', 'padding': '0px', 'background': '#fafafa' }} />
            </Dialog>


            <Fragment>
                <div className="mb-3">
                    <h6 className="mb-3"> Partner Detail</h6>
                    <Detail name="Name" value={data?.partner?.name} />
                    <Detail name="Phone" value={data?.partner?.phone_number} />
                    <Detail name="Email" value={data?.partner?.email} />
                </div>
            </Fragment>

            <Fragment>
                <div className="mb-3">
                    {(data?.dispatcher?.name === '') ?
                        <>
                            <h6 className="mb-3"> Dispatcher Detail</h6>
                            <p style={{ 'color': 'red' }}>No Dispatcher Assigned</p>
                        </>
                        :
                        <>
                            <h6 className="mb-3"> Dispatcher Detail</h6>
                            <Detail name="Name" value={data?.dispatcher?.name} />
                            <Detail name="Phone" value={data?.dispatcher?.phone_number} />
                            <Detail name="Email" value={data?.dispatcher?.email} />
                            <Detail name="License ID" value={data?.dispatcher?.license_id} />
                            <Detail name="Vehicle ID" value={data?.dispatcher?.vehicle_id} />
                        </>
                    }
                </div>

            </Fragment>
            <Fragment>
                <div className="mb-3">
                    <h6 className="mb-3">Customer Detail</h6>
                    <Detail name="Name" value={data?.customer?.name} />
                    <Detail name="Phone" value={data?.customer?.phone_number} />
                    <Detail name="email" value={data?.customer?.email} />
                </div>
            </Fragment>
            <Fragment>
                <div className="mt-3" style={{ 'display': 'flex' }}>
                    <span className="mb-2 mr-2">
                        <Button style={{ 'background': '#011b33' }} onClick={() => assignDispatch()} disabled={( data?.status === 'fulfilled' || data?.status === 'cancelled') } label="Assign Dispatcher" className="p-button-sm" />
                    </span>
                    {(data?.dispatcher?.name !== '' ) ?
                        <span className='ml-2'>
                            <SplitButton style={{ "font-size": "10px", 'background': '#011b33' }} label="update status" model={items} disabled={( data?.status === 'fulfilled' || data?.status === 'cancelled') } className="p-button-sm p-mr-1"></SplitButton>
                        </span>
                        :
                        null
                    }

                </div>
            </Fragment>
            {loader ? <ContainerLoader /> : null}

        </>
    )
}

const OrderDetailSummary = ({ data }) => {
    let amount = data?.products?.map(item => item.amount)?.reduce((total, value) => total + value);
    let quantity = data?.products?.map(item => item.quantity)?.reduce((total, value) => total + value);
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return (
        <>
            <Fragment>
                <div className="mb-3">
                    <h6 style={{ "display": "flex", "justify-content": "space-between" }}>
                        <span className="mb-3 ml-3">#Order</span>
                        <span className="mb-3 ml-3">{data?.order_date}</span>
                    </h6>
                    <DashbaordTable col={12} dataRow={['name', 'quantity', 'unit_value', 'amount']} data={data?.products || []} header="Products" headerRow={['Item', 'Quanity', 'Unit', 'Amount']} />
                    <div className="row ml-1 mt-3">
                        <div className="col-6">
                            <h5>Total quantity</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="order-detail__left mr-3">{quantity}</h5>
                        </div>
                        <div className="col-6">
                            <h5>Total amount</h5>
                        </div>
                        <div className="col-6">
                            <h5 className="order-detail__left mr-3">₦{toNumber(amount)}</h5>
                        </div>
                    </div>
                </div>
            </Fragment>
            <Fragment>
                <div className="mb-3">
                    <h6 className="mb-3">Order Detail</h6>
                    <Detail name="Name" value={data?.name} />
                    <Detail name="Order quantity" value={data?.order_quantity} />
                    <Detail name="Pickup area" value={data?.pickup_area} />
                    <Detail name="Pickup address" value={data?.pickup_address} />
                    <Detail name="Delivery area" value={data?.delivery_area} />
                    <Detail name="Delivery address" value={data?.delivery_address} />
                    <Detail name="Delivery option" value={data?.delivery_option} />
                    <Detail name="Delivery time" value={data?.delivery_time} />
                    <Detail name="Dispatch fee" value={data?.dispatch_fee} />
                    <Detail name="Communication" value={data?.communication_option} />
                    <Detail name="Order status" value={data?.status} />
                    <Detail name="Payment Method" value={data?.payment_method} />
                    <Detail name="Vehicle" value={data?.vehicle} />
                    <Detail name="Weight" value={data?.weight} />
                    <Detail name="Time" value={data?.time} />
                    <Detail name="Month" value={months[data?.month]} />
                    <Detail name="Year" value={data?.year} />
                    <Detail name="Total Fee" value={data?.total} />

                </div>
            </Fragment>
        </>

    )
}

export default OrderDetailSummary


