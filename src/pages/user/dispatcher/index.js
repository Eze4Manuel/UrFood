import React, { useState, useEffect } from 'react';
import './dispatcher.css';
import NoData from '../../../components/widgets/NoData';
import SubNavbar from '../../../components/subnavbar/index';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import NewDispatcherForm from './NewDispatcherForm';
import { ContainerLoader } from '../../../components/loading/Loading';
import DispatcherUserData from './DispatcherUserData'
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../../components/flash/Alert';
import helpers from '../../../core/func/Helpers';

const noDataTitle = "You haven't created any dispatcher yet.";
const noDataParagraph = "You can create a dispatcher yourself by clicking on the button Add dispatcher.";


const Dispatcher = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);


    const fQeury = (data) => {
        return data?.map(d => {
            let pd = d?.dispatcher_data
            return {
                ...pd,
                ...d
            }
        })
    }

    // // data 
    // useEffect(() => {
    //     (async () => {
    //         setLoader(true)
    //         let reqData = await lib.get(page, null, user?.token)
    //         if (reqData.status === "error") {
    //             helpers.sessionHasExpired(set, reqData.msg)
    //         }
    //         if (reqData.status === 'ok') {
    //             setData(reqData.data);
    //         }
    //         setLoader(false);
    //         console.log(reqData);
    //     })()
    // }, [user?.token, page, set])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = fQeury(data.slice(start, stop));

    const reload = async () => {
        setLoader(true)
        let reqData = await lib.get(1, null, user?.token)
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(reqData.data)
        }
    }

    const onSearch = async () => {
        setLoader(true)
        let reqData = await lib.get(1, searchInput, user?.token)
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(reqData.data)
        } else {
            setNotFound(true)
            setTimeout(() => {
                setNotFound(false)
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
            // setOpenForm(false)
            setData([reqData.data, ...data])
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Dispatcher created' })
        }
    }

    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
    }

    const onSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getOne(value?.auth_id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }

    const onDeleted = async (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data.filter(val => (String(val?.auth_id) !== String(id)))
        setData(d)
        await reload()
    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewDispatcherForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton
                    filterName="dispatcher"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for dispatcher..."
                    ariaLabel="dispatcher"
                    ariaDescription="dispatcher"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="dispatcher"
                    buttonTitle="Add dispatcher"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {viewData.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : null}
                <DispatcherUserData onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                <div className="dispatcher-table__container">
                    {
                        viewData.length > 0
                            ? (
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
                                    tableTitle="Dispatcher"
                                    tableHeader={['#', 'username', 'First Name', 'Last Name', 'Phone']}
                                    dataFields={['username', 'first_name', 'last_name', 'phone_number']}
                                />
                            )
                            : null
                    }
                </div>
            </main>
        </div>
    );
}

export default Dispatcher;