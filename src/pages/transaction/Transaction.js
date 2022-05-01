import React, { useEffect, useState } from 'react';
import './Transaction.css';
import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import TransactionDetail from './TransactionDetail'
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const noDataTitle = "No transaction have have been made yet.";
const noDataParagraph = "You will see all transactions on this page.";

const fQeury = (data) => {
    return data?.map(d => {
        let px = d || []
        return {
            email: px?.email || d?.contact_email,
            phone_number: px?.phone_number || d?.contact_phone_nnumber,
            ...d
        }
    })
}
const Transaction = (props) => {
    const { set, user } = useAuth();
    const NavigationBar = props.NavigationBar;
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [, setNotFound] = useState(false);
    const [editable, setEditable] = useState(true);
    const [dispatchFee, setDispatchFee] = useState('');

  
    const updateFee = async () => {
        setLoader(true)
        let reqData = await lib.updateDispatch(user?.token, dispatchFee);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg);
                helpers.alert({notifications: notify, icon: 'error', color:'red', message: reqData.msg})
            }
            if (reqData.status === 'ok') {
                data?.forEach( e => {
                    e.dispatch_fee = parseInt(dispatchFee);
                });
                helpers.alert({notifications: notify, icon: 'success', color:'green', message: "Dispatch Fee Updated"})
            }
            setLoader(false);

    } 
    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(page, null, user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data))
            }
            setLoader(false);
        })()
    }, [page, set, user?.token])

    // Get urfood Dispatch fee
    useEffect(() => {
        (async () => {
            let reqData = await lib.getDispatchFee(user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setDispatchFee(reqData.data?.amount);
            }
        })()
    }, [user?.token, set])

  
    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data?.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = data?.slice(start, stop);

    

    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token)
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

    const onDeleted = (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data?.filter(val => (String(val?.auth_id) !== String(id)) || (String(val?._id) !== String(id)))
        setData(s => (d))
    }
    const updateDispatchFee = (
        <div className="p-grid p-fluid">
            <h5 style={{fontSize: "14px"}}>Update Dispatch Fee</h5>
            <div className="p-col-12">
                <div className="p-inputgroup">
                    <InputText placeholder={`${dispatchFee}`} onChange={(e) => setDispatchFee(e.target.value)} value={dispatchFee} disabled={editable} />
                    <Button icon="pi pi-pencil" onClick={() => setEditable(!editable)} className="p-button-primary p-button-edit" />
                    <Button icon="pi pi-check" onClick={() => updateFee()} disabled={editable} className="p-button-success p-button-update" />
                </div>
            </div>
        </div>
    );
    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                {loader ? <ContainerLoader /> : null}
                <SubNavbar
                    showFilter
                    showSearch
                    showField = {true}
                    filterName="transaction"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for transaction..."
                    ariaLabel="transaction"
                    ariaDescription="transaction"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="transaction"
                    buttonTitle="Update Dispatch Fee"
                    onSelectChange={setOption}
                    option={option}
                    onShowFieldTitle={'Update Dispatch'}
                    onShowField={updateDispatchFee}
                />
                {data?.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                    <>
                        <TransactionDetail onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                        <div className="transaction-table__container">  
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
                                tableTitle="Transactions"
                                tableHeader={['#', 'ID', 'Name', 'Email', 'Payment Method', 'Amount']}
                                dataFields={['_id', 'name', 'email', 'payment_method', 'amount']}
                            />
                        </div>
                    </>
                }
            </main>
        </div>
    );
}

export default Transaction;