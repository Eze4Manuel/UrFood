import React, { useState, useEffect } from 'react';
import './Location.css';
import SubNavbar from '../../components/subnavbar/index';
import NewLocationForm from './NewLocationForm';
import lib from './lib';
import Table from '../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import { ContainerLoader } from '../../components/loading/Loading';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../components/flash/Alert';
import LocationSummary from './LocationSummary'


// const noDataTitle = "You haven't created any location user yet.";
// const noDataParagraph = "You can create a location yourself by clicking on the button Add location.";

const Location = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);
    const [noDataAlert, setNoDataAlert] = useState(false);

    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            await fetchData();
            setLoader(false)
        })()
    }, [user?.token, page, set])

    const fetchData =  async () => {
            let reqData = await lib.get(page, null, user?.token)
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                (reqData.data?.length === 0) ?
                    setNoDataAlert(true)
                    :
                    setData(reqData.data)
            }        
    }

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data?.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    const viewData = data?.slice(start, stop);

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
        let reqData = await lib.createLocation(values, user?.token)
        setLoading(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setValues(resetData)
            setOpenForm(false)
            setData([reqData.data, ...data])
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Location created' })
        }
    }

    const fetchMore = (page, key, set) => {
        onSetPage(page, key, set)
    }
    const onHide = () => {
        fetchData();
        setOpenData(false);
    }

    const onSelected = async (value) => {
        setSelected(value)
        setOpenData(true)
    }

    const onDeleted = async (id) => {
        // remove from selected
        setSelected(null)
        // close modal
        setOpenData(false)
        // remove from data list
        let d = data?.filter(val => (String(val?._id) !== String(id)))
        setData(d)
        await reload()
    }

    return (
        <div className='main-content'>
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNoDataAlert(false)} show={noDataAlert} title="Notification" message="You have no more data" />

                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewLocationForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton
                    filterName="location"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for location..."
                    ariaLabel="location"
                    ariaDescription="location"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="location"
                    buttonTitle="Add location"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {openData ?
                    <LocationSummary onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={onHide} />
                    : null
                }

                <div className="location-table__container">
                    <div className="conatainer overflow-hidden">
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
                                        tableTitle="Location"
                                        tableHeader={['#', 'ID', 'Location Name', 'City', 'No of Areas']}
                                        dataFields={['_id', 'name', 'city', `${'areas.length'}`]}
                                    />
                                )
                                : null
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Location;