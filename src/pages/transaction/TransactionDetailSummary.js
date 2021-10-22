import React, { Fragment } from 'react';
import { toNumber } from '../../core/func/format';
import './TransactionDetailSummary.css';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';


const Detail = ({ name, value }) => value ? (<p className="transaction-info__detail"><span>{name}</span> <span>{value}</span> </p>) : null

export const Customer = ({ data }) => {

    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3">Customer Detail</h6>
                <Detail name="Name" value={data?.order.customer?.name} />
                <Detail name="Email" value={data?.order.customer?.email} />
                <Detail name="Phone" value={data?.order.customer?.phone_number} />
            </div>
        </Fragment>
    )
}

export const Dispatcher = ({ data }) => {
      
    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3">Dispatcher Detail</h6>
                <Detail name="Name" value={data?.order.dispatcher?.name} />
                <Detail name="Email" value={data?.order.dispatcher?.email} />
                <Detail name="Phone" value={data?.order.dispatcher?.phone_number} />
                <Detail name="License ID" value={data?.order.dispatcher?.license_id} />
                <Detail name="Dispatch Fee" value={data?.dispatch_fee} />
                
            </div>
        </Fragment>
    )
}
export const Pharmacy = ({ data }) => {
    return (
        <Fragment>
            <div className="mb-3">
                <h6 className="mb-3">Pharmacy Detail</h6>
                <Detail name="Name" value={data?.order.pharmacy?.name} />
                <Detail name="Email" value={data?.order.pharmacy?.email} />
                <Detail name="Phone" value={data?.order.pharmacy?.phone_number} />
                <Detail name="Attendant" value={data?.order.pharmacy?.attendant} />
            </div>
        </Fragment>
    )
}
const ProductDetailSummary = ({ data }) => {
    let amount = data?.order.products?.map(item => item.amount)?.reduce((total, value) => total + value);
    let quantity = data?.order.products?.map(item => item.quantity)?.reduce((total, value) => total + value);
    return (
        <Fragment>
            <div className="mb-3">
                <h6 style={{ "display": "flex", "justify-content": "space-between" }}>
                    <span className="mb-3 ml-3">#Transaction</span>
                    <span>
                        <div className="mb-3 ml-3">{data?.order.order_date}</div>
                        <div className="mb-3 ml-3" style={{ "float": "right" }}>{data?.order.order_time}</div>
                    </span>
                </h6>
                <DashbaordTable col={12} dataRow={['name', 'quantity', 'amount']} data={data?.order.products || []} header={'Products purchased'} headerRow={['Item', 'Quanity', 'Amount']} />
                <div className="row ml-1 mt-3">
                    <div className="col-6">
                        <p>Quantity</p>
                    </div>
                    <div className="col-6">
                        <p className="transaction-detail__right ml-3">{quantity}</p>
                    </div>
                    <div className="col-6">
                        <p>Amount</p>
                    </div>
                    <div className="col-6">
                        <p className="transaction-detail__right ml-3">₦{toNumber(amount)}</p>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h6 className="mb-3">Order Detail</h6>
                <Detail name="Order Status" value={data?.order.order_status} />
                <Detail name="Order quantity" value={data?.order.order_quantity} />
                <Detail name="Order Amount" value={data?.order.order_amount} />
                <Detail name="Pharmacy Area" value={data?.order.pharmacy_area} />
                <Detail name="Pharmacy Address" value={data?.order.pharmacy_address} />
            </div>
            <div className="mb-3">
                <h6 className="mb-3">Transaction Detail</h6>
                <Detail name="Name" value={data?.name} />
                <Detail name="Email" value={data?.email} />
                <Detail name="Phone" value={data?.phone_number} />
                <Detail name="Payment Method" value={data?.payment_method} />
                <Detail name="Amount " value={data?.amount} />
                <h6 style={{ "display": "flex", "justify-content": "space-between" }}>
                    <span className="mb-3">#Total</span>
                    <span>
                        <span className="mb-3 ml-3">N{data?.total}</span>
                    </span>
                </h6>
            </div>
        </Fragment>
    )
}

export default ProductDetailSummary
