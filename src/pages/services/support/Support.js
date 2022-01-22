import React, { useEffect, useState } from 'react';
import './Support.css';
import SubNavbar from '../../../components/subnavbar';
import NoData from '../../../components/widgets/NoData';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import NewSupportForm from './NewSupportForm';
import { ContainerLoader } from '../../../components/loading/Loading';
import SupportUserData from './SupportUserData'
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../../components/flash/Alert';
import helpers from '../../../core/func/Helpers';
import Tabs from "../../../components/tabs/Tabs";
import { useCallback } from 'react'


const Support = (props) => {
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
    const [supportDetail, setSupportDetail] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [order, setOrder] = useState("All");


    const noDataTitle = "You haven't created any support account yet.";
    const noDataParagraph = "You can create a support yourself by clicking on the button Add support.";

    const processStatus = (num) => {
        switch (num) {
            case 1:
                return 'pending';
            case 2:
                return 'active';
            case 3:
                return 'resolved';
            case 4:
                return 'unresolved';
            default:
                return num;
        }
    }

    const fQeury = useCallback((data) => {
        return data?.map(d => {
            return {
                ...d,
                status_state: processStatus(d.status)
            }
        })
    },[])

    const PQeury = useCallback((data) => {
        return data?.map(d => {
            return {
                name: d.name,
                auth_id: d.auth_id,
            }
        })
    }, [])

    // appends support user to various support listing if there exists
    const MQeury = (data) => {
        return data?.map(d => {
            supportDetail?.forEach(e => {
                if (d.assigned_support_user === e.auth_id) {
                    d.support_user_name = e.name
                    return d;
                }
            })
            return d;
        })
    }

    // Attaches support username to 
    const SelectedQuery = (d) => {
        supportDetail?.forEach(e => {
            if (d.assigned_support_user === e.auth_id) {
                d.support_user_name = e.name
                return d;
            }
        })
        return d;
    }

    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(page, null, user?.token, 'vendor');
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                let reqData2 = await lib.getAdminSupports(user?.token)
                if (reqData2.status === "error") {
                    helpers.sessionHasExpired(set, reqData2.msg)
                }
                if (reqData2.status === 'ok') {
                    setSupportDetail(PQeury(reqData2.data));
                    setData(fQeury(reqData.data));
                    setProcessedData(fQeury(reqData.data));
                }
                setLoader(false)
            }
        })();
    }, [user?.token, page, fQeury, PQeury, set])


    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = MQeury(processedData?.slice(start, stop));

    const reload = async () => {
        setLoader(true)
        let reqData = await lib.get(1, null, user?.token)
        setLoader(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg);
        }
        if (reqData.status === 'ok') {
            let reqData2 = await lib.getAdminSupports(user?.token)
            if (reqData2.status === "error") {
                helpers.sessionHasExpired(set, reqData2.msg)
            }
            if (reqData2.status === 'ok') {
                setSupportDetail(PQeury(reqData2.data));
                setData(fQeury(reqData.data));
                setProcessedData(fQeury(reqData.data));
            }
            setLoader(false)
        }
    }

    const onSearch = async () => {
        setLoader(true);
        let reqData = await lib.get(1, searchInput, user?.token, 'support')
        setLoader(false)
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(fQeury(reqData.data));
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
            setValues(resetData);
            setOpenForm(false);
            setData([...reqData.data, ...data]);
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Support account created' });
            await reload();
        }
    }

    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set);
    }

    const onSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getOne(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(SelectedQuery(reqData.data));
        }
        setLoader(false)
        setOpenData(true)
    }

    const onDeleted = async (id) => {
        // remove from selected
        setSelected(null);
        // close modal
        setOpenData(false);
        // remove from data list
        let d = data?.filter(val => (String(val?.auth_id) !== String(id)))
        setData(fQeury(d));
        await reload();
    }

    const changeTab = (val) => {
        switch (val) {
            case 'All':
                setProcessedData(data)
                setOrder(val);
                break;
            case 'pending':
                setProcessedData(data.filter(e => {
                    return e.status.toString() === '1'
                }));
                setOrder(val)
                break;
            case 'active':
                setProcessedData(data.filter(e => {
                    return e.status.toString() === '2'
                }));
                setOrder(val)
                break;
            case 'resolved':
                setProcessedData(data.filter(e => {
                    return e.status.toString() === '3'
                }));
                setOrder(val)
                break;
            case 'unresolved':
                setProcessedData(data.filter(e => {
                    return e.status.toString() === '4'
                }));
                setOrder(val)
                break;
            default:
                break
        }
    }

    return (
        <div className="main-content">
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewSupportForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} data={data} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_support"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for support..."
                    ariaLabel="support"
                    ariaDescription="support"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_support"
                    buttonTitle="Add Support"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <SupportUserData onUpdated={(data) => setSelected(data)} onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} reload={() => reload()} />
                {
                    data.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :

                        <div className="support-table__container">
                            <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["All", "pending", "active", "resolved", "unresolved"]} />
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
                                tableTitle="Support"
                                tableHeader={['#', 'ID', 'Title', 'Support Type', 'Support Username', 'Status']}
                                dataFields={['_id', 'title', 'support_type', 'support_user_name', 'status_state']}
                            />
                        </div>
                }
            </main>
        </div>
    )
}

export default Support
