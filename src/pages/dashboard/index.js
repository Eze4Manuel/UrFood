import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';
import DashboardCard from '../../components/dashboardhelps/DashboardCard';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';

import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
// import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import { fShortenNumber } from '../../assets/utils/formatNumber';


const Dashboard = (props) => {

    const { set, user } = useAuth();
    const [loader, setLoader] = useState(false);
    const [page,] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);
    const [userTypes, setUserTypes] = useState({});
    const [totalTransactions,] = useState([]);
    const [revenueFor6Months, setRevenueFor6Months] = useState([]);
    // const [, setRevenueByArea] = useState([]);
    // const [totalVendorRevenue, setTotalVendorRevenue] = useState([]);
    const [revenueAreaFor6Months, setRevenueAreaFor6Months] = useState([]);
    const [totalPharmacyRevenue,] = useState({});
    const [orderCount, setOrderCount] = useState([]);
    const [orderStatus, setOrderStatus] = useState({});
    const [orderArea, setOrderArea] = useState([]);
    const [orderMonth, setOrderMonth] = useState([]);
    const [revenueByMonth, setRevenueByMonth] = useState({});

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();


    // Getting All Users by count
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getUsers(user?.token, 'count')
            if (reqData.status === 'ok') {
                setTotalUsers(reqData.data)
            }
            setLoader(false);
        })()
    }, [user?.token, page, set])


    // Getting Users by type
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getUsers(user?.token, 'type')
            if (reqData.status === 'ok') {

                let types = {}
                reqData.data.forEach(e => {
                    types[`${e._id}`] = e.total;
                })
                setUserTypes(types);
            }
            setLoader(false);
        })()
    }, [user?.token, page, set])

    // Getting Transaction summary by customer
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'vendor', currentYear)
            if (reqData.status === 'ok') {
                setRevenueAreaFor6Months(reqData.data);

            }
        })()
    }, [user?.token, set, currentYear])

    // Getting Transaction summary by Month
    useEffect(() => {
        (async () => {
            let reqData = await lib.getTransactionsSummary(user?.token, 'month', currentYear)
            if (reqData.status === 'ok') {
                setRevenueByMonth(reqData.data.find(e => {
                    return e._id === currentMonth
                }));
                setRevenueFor6Months(reqData.data);
            }
        })()
    }, [user?.token, set, currentMonth, currentYear])



    // Getting Total Order by count
    useEffect(() => {
        (async () => {
            let reqData = await lib.getOrderSummary(user?.token, 'count', currentYear)
            if (reqData.status === 'ok') {
                setOrderCount(reqData.data[0])
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Order summary by status
    useEffect(() => {
        (async () => {
            let reqData = await lib.getOrderSummary(user?.token, 'status', currentYear)
            if (reqData.status === 'ok') {
                await mapStatus(reqData.data);
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Order summary by area
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'area', currentYear)
            if (reqData.status === 'ok') {
                setOrderArea(reqData.data);
            }
        })()
    }, [user?.token, page, set, currentYear])

    // Getting Order summary by month
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.getOrderSummary(user?.token, 'month', currentYear)
            if (reqData.status === 'ok') {
                setOrderMonth(reqData.data);
            }
            setLoader(false)
        })()
    }, [user?.token, page, set, currentYear])

    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let reveneData = revenueFor6Months.length > 0 ? revenueFor6Months?.map((e, ind) => {
        return { sn: ind + 1, month: months[e._id], dispatch_fee: e.dispatch_fee, amount: e.amount, total: e.total }
    }) : [{ sn: 0, name: '', month: '', dispatch_fee: '', amount: '', total: '' }]
    reveneData.splice(5);

    let reveneArea = revenueAreaFor6Months.length > 0 ? revenueAreaFor6Months?.map((e, ind) => {
        return { sn: ind + 1, name: e.name, dispatch_fee: e.dispatch_fee, amount: e.amount, total: e.total }
    }) : [{ sn: 0, name: '', month: '', dispatch_fee: '', amount: '', total: '' }]
    reveneArea.splice(5);

    let orderCurrentMonth = orderMonth?.find(e => {
        if (e._id === currentMonth) return true;
        return false
    })

    const mapStatus = (res) => {
        let obj = {
            active: 0,
            cancelled: 0,
            fulfilled: 0,
            pending: 0
        }
        res.forEach(e => {
            obj[`${e._id}`] = e.total
        })
        setOrderStatus(obj);
        return
    }

    // Order 
    const userArea = (orderArea.length > 0) ?
        orderArea?.map((e, ind) => (
            { sn: ind + 1, area: e._id, total: e.total }
        ))
        :
        [
            { sn: 0, area: "", total: 0 },
        ]


    const userData2 = (orderMonth.length > 0) ? orderMonth?.map((e, ind) => (
        { sn: ind, month: months[e._id], total: e.total }
    )) :
        [
            { sn: 0, routes: '0', month: months[currentMonth], total: '0' },
        ]

    const userMonths = (orderMonth.length > 0) ? orderMonth?.map((e, ind) => (
        { sn: ind + 1, month: months[e._id], total: e.total }
    )) :
        [
            { sn: 0, routes: '0', month: months[currentMonth], total: '0' },
        ]
    // Getting last 6 months
    userMonths.splice(5);

    const userStatus = (orderStatus) ? Object.entries(orderStatus).map((e, ind) => (
        { sn: ind + 1, status: e[0], total: e[1] }
    ))
        :
        [
            { sn: 0, routes: '0', month: months[currentMonth], total: '0' },
        ]



    let revenue = `Gross Revenue (${months[currentMonth]})`;
    let vendorRevenue = `Vendor Revenue (${months[currentMonth]})`;
    let dispatchFeeCurrentMonth = `Dispatch Fee Revenue (${months[currentMonth]})`;
    let totalOrder = `Total Order (${months[currentMonth]})`;

    return (
        <div className='main-content'>
            {loader ? <ContainerLoader /> : null}
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                    <div className="product-summary__ctn mt-5">
                        {/* REVENUE */}
                        <div className="row">
                            <DashboardCard col="3" header="Gross Revenue (lifetime)" value={`0`} desc="All time revenue" />
                            <DashboardCard color='yellow' col="3" header="Vendor Revenue (lifetime)" value={`${fShortenNumber(totalPharmacyRevenue?.total) ?? 0}`} desc="All time vendor revenue" />
                            <DashboardCard color='green' col="3" header="Dispatch Fee Revenue (lifetime)" value={`${fShortenNumber(totalTransactions?.total) ?? 0}`} desc="All time dispatch fee revenue" />
                            <DashboardCard color='red' col="3" header="Total Order (lifetime)" value={`${fShortenNumber(orderCount?.total) ?? 0}`} desc="All time orders" />
                        </div>
                        <div className="row">
                        {console.log(revenueByMonth)}
                            <DashboardCard col="3" header={revenue} value={`${fShortenNumber(revenueByMonth?.total) ?? 0}`} desc="Current Month revenue" />
                            <DashboardCard color='yellow' col="3" header={vendorRevenue} value={`${fShortenNumber(totalPharmacyRevenue?.total) ?? 0}`} desc="Current Month vendor revenue" />
                            <DashboardCard color='green' col="3" header={dispatchFeeCurrentMonth} value={`${fShortenNumber(revenueByMonth?.dispatch_fee) ?? 0}`} desc="Current Month Dispatch Fee" />
                            <DashboardCard color='green' col="3" header={totalOrder} value={`${fShortenNumber(orderCurrentMonth?.total) ?? 0}`} desc="Current Month Order" />
                        </div>
                        {/* ORDERS */}
                        <div className="row mt-5">
                            <DashboardCard color='red' col="3" header="Users" value={`${fShortenNumber(totalUsers?.total ?? 0)}`} desc="Total users" />
                            <DashboardCard color='green' col="3" header="Customers" value={`${fShortenNumber(userTypes?.customer ?? 0)}`} desc="Total Customers" />
                            <DashboardCard color='blue' col="3" header="Vendors" value={`${fShortenNumber(userTypes?.vendor ?? 0)}`} desc="Total Listed Food Vendros" />
                            <DashboardCard color='yellow' col="3" header="Dispatchers" value={`${fShortenNumber(userTypes?.dispatcher ?? 0)}`} desc="Total Delivery Personnel" />
                        </div>
                        <div className="row mb-5 pb-5">
                            <DashbaordTable col="12" data={userData2} dataRow={['sn', 'routes', 'month', 'product', 'amount']} header="Routes" headerRow={['#', 'Routes', 'Months', 'Items', 'Amount']} />
                            <DashbaordTable dataRow={['sn', 'month', 'amount', 'dispatch_fee', 'total']} data={reveneData} header="Revenue For Last 6 months" headerRow={['#', 'Month', 'Amount', 'Dispatch Fee', 'Total']} />
                            <DashbaordTable dataRow={['sn', 'name', 'amount', 'dispatch_fee', 'total']} data={reveneArea} header="Revenue By Vendor" headerRow={['#', 'Area', 'Amount', 'Dispatch Fee', 'Total']} />
                            <DashbaordTable col="6" data={userStatus} dataRow={['sn', 'status', 'total']} header="Orders Status" headerRow={['#', 'Status', 'Total']} />
                            <DashbaordTable col="6" data={userArea} dataRow={['sn', 'area', 'total']} header="Orders by Area" headerRow={['#', 'Area', 'Total']} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;