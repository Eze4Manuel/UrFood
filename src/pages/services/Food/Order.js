import React, { useEffect, useState } from 'react';
import './Order.css';
import NoData from '../../../components/widgets/NoData';
import SubNavbar from '../../../components/subnavbar/index';
import { useAuth } from '../../../core/hooks/useAuth';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import { ContainerLoader } from '../../../components/loading/Loading';
import Tabs from "../../../components/tabs/Tabs";
import helpers from '../../../core/func/Helpers';
import OrderDetail from './OrderDetail'

const noDataTitle = "You haven't created any item yet.";
const noDataParagraph = "All Items made will appear here.";

const Order = (props) => {
    const { set, user } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [order, setOrder] = useState("All");
    const [data, setData] = useState([]);
    const [, setNotFound] = useState(false);
    const [processedData, setProcessedData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);

    const fQeury = (data) => {
        return data.map(d => {
            let px = d || []
            return {
                email: px?.email || d?.contact_email,
                phone_number: px?.phone_number || d?.contact_phone_nnumber,
                ...d
            }
        })
    }
    // data 
    useEffect(() => {
        (async () => {
            setLoader(true);
            let reqData = await lib.get(page, null, user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data));
                setProcessedData(fQeury(reqData.data));
            }
            setLoader(false);
        })()
    }, [page, set, user?.token])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data?.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    let viewData = processedData?.slice(start, stop);

    // Trimming data length
    viewData = viewData.map(e => {
        if(e.pickup_address.length > 20) {
            e.pickup_address = e.pickup_address.substring(0, 20) + '...';
        }
        if(e.delivery_address.length > 20) {
            e.delivery_address = e.delivery_address.substring(0, 20) + '...';
        }
        if(e.order_date){
            e.order_date = new Date(e.order_date).toDateString()
        }
        return e;
    });


    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token, user?.px_id)
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(fQeury(reqData.data))
        } else {
            setNotFound(true)
            setTimeout(() => {
                setNotFound(false)
            }, 3000)
        }
    }

    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
        // fetch the next page from the service and update the state
    }

    const onSelected = (value) => {
        setLoader(true)
        setTimeout(() => {
            setSelected(value)
            setOpenData(true)
            setLoader(false)
        }, 3000)
    }
 

    const changeTab = (val) => {
        switch (val) {
            case 'All':
                setProcessedData(data)
                setOrder(val);
                break;
            case 'pending':
                setProcessedData(data.filter(e => {
                    return e.status === val
                }));
                setOrder(val)
                break;
            case 'active':
                setProcessedData(data.filter(e => {
                    return e.status === val
                }));
                setOrder(val)
                break;
            case 'cancelled':
                setProcessedData(data.filter(e => {
                    return e.status === val
                }));
                setOrder(val)
                break;
            case 'fulfilled':
                setProcessedData(data.filter(e => {
                    return e.status === val
                }));
                setOrder(val)
                break;
            default:
                break;
        }
    }
    

    const onDeleted = (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data?.filter(val => (String(val?.auth_id) !== String(id)) || (String(val?._id) !== String(id)))
        setData(s => (d))
    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                <SubNavbar
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="item"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for item..."
                    ariaLabel="item"
                    ariaDescription="item"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="item"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <div className="order-table__container">
                    <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["All", "pending", "active", "cancelled", "fulfilled"]} />
                    {data?.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                        <>
                            <OrderDetail onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)}/>
                            <Table
                                onSelectData={onSelected}
                                prev={() => fetchMore(page, 'prev', setPage)}
                                next={() => fetchMore(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginate}
                                data={viewData}
                                perPage={perPage}
                                route="" // {config.pages.user}
                                tableTitle="Items"
                                tableHeader={['#', 'Items', 'Pickup', 'Destination', 'Fee', 'Date', 'Status']}
                                dataFields={['quantity', 'pickup_area', 'delivery_area', 'total', 'order_date', 'status']}
                            />
                        </>
                    }
                </div>
            </main>
        </div>
    );
}

export default Order;