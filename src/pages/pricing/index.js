import React, { useState, useEffect } from 'react';
import './Pricing.css';
// import NoData from '../../components/widgets/NoData';
import SubNavbar from '../../components/subnavbar/index';
import NewPricingForm from './NewPricingForm';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import PricingUserData from './PricingUserData';
import { ContainerLoader } from '../../components/loading/Loading';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../components/flash/Alert';

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// const noDataTitle = "You haven't created any pricing user yet.";
// const noDataParagraph = "You can create a pricing yourself by clicking on the button Add pricing.";

const Pricing = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noDataAlert, setNoDataAlert] = useState(false);
    const [editable, setEditable] = useState(true);
    const [dispatchFee, setDispatchFee] = useState('');
    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(page, null, user?.token)

            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                console.log(reqData.data);
                (reqData.data?.length === 0) ? 
                setNoDataAlert(true)
                :
                setData(reqData.data);
            }
            setLoader(false);
        })()
    }, [user?.token, page, set])

     // Get urmed Dispatch fee
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

    const reload = async () => {
        setLoader(true);
        let reqData = await lib.get(1, null, user?.token)
        setLoader(false);
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(reqData.data);
        }
    }

    const onSearch = async () => {
        setLoader(true);
        let reqData = await lib.get(1, searchInput, user?.token);
        setLoader(false);
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(reqData.data);
        } else {
            setNotFound(true);
            setTimeout(() => {
                setNotFound(false);
            }, 3000)
        }
    }

    const onCreate = async (values, setLoading, setError, setValues, resetData) => {
        setLoading(true)
        let reqData = await lib.create(values, user?.token)
        setLoading(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setValues(resetData)
            setOpenForm(false)
            console.log(reqData.data);
            setData([reqData.data, ...data])
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Pricing created' })
        }
    }
    const updateFee = async () => {
        setLoader(true)
        let reqData = await lib.updateDispatch(user?.token, dispatchFee);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg);
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData.status === 'ok') {
            data?.forEach(e => {
                e.dispatch_fee = parseInt(dispatchFee);
            });
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: "Dispatch Fee Updated" })
        }
        setLoader(false);
    }
    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
    }

    const onSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getOne(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }
    const updateDispatchFee = (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <div className="p-inputgroup">
                    <InputText placeholder={`${dispatchFee}`} id='dispatchFee' onChange={(e) => setDispatchFee(e.target.value)} value={dispatchFee} disabled={editable} />
                    <Button icon="pi pi-pencil" onClick={() => setEditable(!editable)} className="p-button-primary p-button-edit" />
                    <Button icon="pi pi-check" onClick={() => updateFee()} disabled={editable} className="p-button-success p-button-update" />
                </div>
            </div>
        </div>
    );
    const onDeleted = async (id) => {
        console.log(id);
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data?.filter(val => (String(val?._id) !== String(id)))
        setData(d)
        await reload()
    }

    const onUpdate = (updatedData) => {
        console.log(updatedData);
        let d = data?.map(val => {
           if(String(val?._id) === String(updatedData?._id)) {
                return val = {...val, ...updatedData}
            }
            return val
        });
        setData(d)
    }
    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                
                <Alert onCancel={() => setNoDataAlert(false)} show={noDataAlert} title="Notification" message="You have no more data" />

                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewPricingForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton
                    filterName="pricing"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for pricing..."
                    ariaLabel="pricing"
                    ariaDescription="pricing"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="pricing"
                    buttonTitle="Add pricing"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <div className="pricing-table__container">
                    <div className="conatainer overflow-hidden">
                        <PricingUserData onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} onUpdate={onUpdate} />
                        {
                            (
                                <Table
                                    onSelectData={onSelected}
                                    prev={() => fetchMore(page, 'prev', setPage)}
                                    next={() => fetchMore(page, 'next', setPage)}
                                    goTo={(id) => goTo(id, setActivePages)}
                                    activePage={activePage}
                                    pages={paginate}
                                    data={viewData}
                                    sideTitle='Update Base Dispatch Fee'
                                    perPage={perPage}
                                    rightSide={updateDispatchFee}
                                    route="" // {config.pages.user}
                                    tableTitle="Pricing"
                                    tableHeader={['#', 'ID', 'Name', 'Pickup', 'Destination', 'Price']}
                                    dataFields={['_id', 'name', `${'pickup_data.name'}`, `${'destination_data.name'}`, 'amount']}
                                />
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Pricing;