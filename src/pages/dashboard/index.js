import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';
import DashboardCard from '../../components/dashboardhelps/DashboardCard';
import DashbaordTable from '../../components/dashboardhelps/DashbaordTable';

import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { ContainerLoader } from '../../components/loading/Loading';
import { fShortenNumber } from '../../assets/utils/formatNumber';


const Dashboard = (props) => {

    const { set, user } = useAuth();
    const [loader, setLoader] = useState(false);
    const [page,] = useState(1);
    const [totalUsers, setTotalUsers] = useState(1);
    const [userTypes, setUserTypes] = useState([]);
    const [totalTransactions, setTotalTransaction] = useState([]);
    const [revenueFor6Months, setRevenueFor6Months] = useState([]);
    const [, setRevenueByArea] = useState([]);
    const [revenueByMonth, setRevenueByMonth] = useState({});
    const [, setTotalCustomerRevenue] = useState([]);
    const [totalPharmacyRevenue, setTotalPharmacyRevenue] = useState({});
    const [, setOrderCount] = useState([]);
    const [, setOrderStatus] = useState({});
    const [orderArea, setOrderArea] = useState([]);
    const [orderMonth, setOrderMonth] = useState([]);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // // Getting Transaction summary by type
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.getUsers(user?.token, 'type')
    //         if (reqData.status === "error") {
    //             helpers.sessionHasExpired(set, reqData.msg)
    //         }
    //         if (reqData.status === 'ok') {
    //             setUserTypes(reqData.data);
    //         }
    //         setLoader(false);
    //     })()
    // }, [user?.token, page, set])


    // // Getting Users summary by count
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.getUsers(user?.token, 'count')
    //         if (reqData.status === 'ok') {
    //             setTotalUsers(reqData.data)
    //         }
    //         setLoader(false);
    //     })()
    // }, [user?.token, page, set])


    // // Getting Transaction summary by count
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.getTransactionsSummary(user?.token, 'count', currentYear)
    //         if (reqData.status === 'ok') {
    //             setTotalTransaction(reqData.data[0])
    //         }
    //         setLoader(false)
    //     })()
    // }, [user?.token, page, set, currentYear])

    // // Getting Transaction summary by customer
    // useEffect(() => {
    //     (async () => {
    //         let reqData = await lib.getTransactionsSummary(user?.token, 'customer', currentYear)
    //         if (reqData.status === 'ok') {
    //             setTotalCustomerRevenue(reqData.data[0])
    //         }
    //     })()
    // }, [user?.token, page, set, currentYear])

    // // Getting Transaction summary by pharmacy
    // useEffect(() => {
    //     (async () => {
    //         let reqData = await lib.getTransactionsSummary(user?.token, 'pharmacy', currentYear)
    //         if (reqData.status === 'ok') {
    //             setTotalPharmacyRevenue(reqData.data[0])
    //         }
    //     })()
    // }, [user?.token, page, set, currentYear])

    // // Getting Transaction summary by Area
    // useEffect(() => {
    //     (async () => {
    //         let reqData = await lib.getTransactionsSummary(user?.token, 'area', currentYear)
    //         if (reqData.status === 'ok') {
    //             setRevenueByArea(reqData.data)
    //         }
    //     })()
    // }, [user?.token, page, set, currentYear])

    // // Getting Transaction summary by Month
    // useEffect(() => { 
    //     (async () => {
    //         let reqData = await lib.getTransactionsSummary(user?.token, 'month', currentYear)
    //         if (reqData.status === 'ok') {
    //             setRevenueByMonth(reqData.data.find(e => {
    //                 return e._id === currentMonth
    //             }));
    //             setRevenueFor6Months(reqData.data)
    //         }
    //     })()
    // }, [user?.token, page, set, currentMonth, currentYear])



    // // Getting Order summary by count
    // useEffect(() => {
    //     (async () => {
    //         let reqData = await lib.getOrderSummary(user?.token, 'count')
    //         if (reqData.status === 'ok') {
    //             setOrderCount(reqData.data[0])
    //         }
    //     })()
    // }, [user?.token, page, set])

    // // Getting Order summary by status
    // useEffect(() => {
    //     (async () => {
    //         let reqData = await lib.getOrderSummary(user?.token, 'status')
    //         if (reqData.status === 'ok') {
    //             await mapStatus(reqData.data)
    //         }
    //     })()
    // }, [user?.token, page, set])

    // // Getting Order summary by area
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.getOrderSummary(user?.token, 'area')
    //         if (reqData.status === 'ok') {
    //             setOrderArea(reqData.data)
    //         }
    //     })()
    // }, [user?.token, page, set])

    // // Getting Order summary by month
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.getOrderSummary(user?.token, 'month')
    //         if (reqData.status === 'ok') {
    //             setOrderMonth(reqData.data)
    //         }
    //         setLoader(false)
    //     })()
    // }, [user?.token, page, set])

    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let reveneData = revenueFor6Months.length > 0 ? revenueFor6Months?.map((e, ind) => {
        return { sn: ind + 1, month: months[e._id], dispatch_fee: e.dispatch_fee, amount: e.amount, total: e.total }
    }) : [{ sn: 0, month: '', dispatch_fee: '', amount: '', total: '' }]
    reveneData.splice(5);



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



    const userData = (orderArea > 0) ?
     orderArea?.map((e, ind) => (
        // { month: e._id, product: e.total, amount: ind + 1, sn: '' }
        null
    ))
     :
        [
            { sn: 1, month: months[currentMonth], product: 0, amount: 0 },
        ]

    const userData2 = (orderMonth > 0) ? orderMonth?.map((e, ind) => (
        // { month: e._id, product: e.total, amount: ind + 1, sn: '' }
        null
    )) :
        [
            { sn: 1, routes: '0', month: months[currentMonth], product: '0', amount: '0' },
        ] 

    return (
        <div className='main-content'>
            {loader ? <ContainerLoader /> : null}
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                    <div className="product-summary__ctn mt-5">
                        {/* REVENUE */}
                        <div className="row">
                            <DashboardCard col="3" header="Lifetime Product" value={`${fShortenNumber(revenueByMonth?.total) ?? 0}`} desc="All time Revenue" />
                            <DashboardCard color='yellow' col="3" header="Lifetime Amount" value={`${fShortenNumber(totalPharmacyRevenue?.total) ?? 0}`} desc="All Partner gross revenue" />
                            <DashboardCard color='green' col="3" header="Products" value={`${fShortenNumber(totalTransactions?.total) ?? 0}`} desc="Total products" />
                            <DashboardCard color='green' col="3" header="Amount" value={`${fShortenNumber(totalTransactions?.total) ?? 0}`} desc="Total transactions" />
                        </div>
                        {/* ORDERS */}
                        <div className="row mt-5">
                            <DashboardCard color='red' col="3" header="Users" value={totalUsers?.total ?? 0} desc="Total users" />
                            <DashboardCard color='green' col="3" header="Partners" value={userTypes[1]?.total ?? 0} desc="Total Support" />
                            <DashboardCard color='blue' col="3" header="Dispatchers" value={userTypes[0]?.total ?? 0} desc="Delivery personnel" />
                            <DashboardCard color='yellow' col="3" header="Support" value={userTypes[2]?.total ?? 0} desc="Listed partner pharmacies" />
                        </div>
                        <div className="row mb-5 pb-5">
                            <DashbaordTable data={userData} col="12" dataRow={['sn', 'month', 'product', 'amount']} header="Dispatch" headerRow={['#', 'Months', 'Product', 'Amount']} />
                            <DashbaordTable col="12" data={userData2} dataRow={[ 'sn', 'routes', 'month', 'product', 'amount']} header="Routes" headerRow={[ '#', 'Routes', 'Months', 'Product', 'Amount']} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;