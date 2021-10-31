import React, { useEffect, useState } from 'react';
import './Listing.css';
import NoData from '../../../components/widgets/NoData';
import SubNavbar from '../../../components/subnavbar/index';
import { useAuth } from '../../../core/hooks/useAuth';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import { ContainerLoader } from '../../../components/loading/Loading';
import helpers from '../../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import NewListingFoodForm from './NewListingFoodForm';
import ListingSummary from './ListingSummary';

const noDataTitle = "You haven't created any item yet.";
const noDataParagraph = "All Listing made will appear here.";

const Listing = (props) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openData, setOpenData] = useState(false);
    const [data, setData] = useState([]);
    const [, setNotFound] = useState(false);
    const [, setProcessedData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [option, setOption] = useState('name');
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const [loader, setLoader] = useState(false);

    const fQeury = (data) => {
        return data.map(d => {
            let px = d?.food || []
            return {
                category: px.category || '',
                description: px.description || '',
                ingredients: px.ingredients || '',
                listing_status: px.listing_status || '',
                name: px.name || '',
                food_id: px._id || '',
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
            console.log(reqData.data);
            setLoader(false);
        })()
    }, [page, set, user?.token])

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data?.length, perPage);
    const start = (activePage === 1) ? 0 : (activePage * perPage) - perPage;
    const stop = start + perPage;
    let viewData = data?.slice(start, stop);

    const reload = async () => {
        setLoader(true)
        let reqData = await lib.get(1, null, user?.token)
        setLoader(false)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok' && reqData?.data?.length > 0) {
            setData(fQeury(reqData.data))
        }
    }

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
    }

    const onSelected = (value) => {
        setLoader(true)
        setTimeout(() => {
            setSelected(value)
            setOpenData(true)
            setLoader(false)
        }, 3000)
    }

    const onCreate = async (values, setLoading, setError, setValues, resetData) => {
        setLoading(true);
        let reqData = await lib.create(values, user?.token)
        setLoading(false);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setValues(resetData);
            setOpenForm(false);
            setData([reqData.data, ...data])
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Food account created' })
            await reload();
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
                <NewListingFoodForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar
                    showFilter
                    showSearch
                    showButton={true}
                    filterName="listing"
                    filterList={['name', 'location', 'phone']}
                    searchPlaceholder="Search for listing..."
                    ariaLabel="listing"
                    ariaDescription="listing"
                    buttonTitle="Create Food Listing"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="item"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <div className="order-table__container">
                    {data?.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                        <>
                            {openData ?
                                <ListingSummary onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                                : null
                            }
                            <Table
                                onSelectData={onSelected}
                                prev={() => fetchMore(page, 'prev', setPage)}
                                next={() => fetchMore(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginate}
                                data={viewData}
                                perPage={perPage}
                                route=""
                                tableTitle="Listing"
                                tableHeader={['#', 'ID', 'Name', 'Price', 'Category']}
                                dataFields={['_id', 'name', 'price', 'category']}
                            />
                        </>
                    }
                </div>
            </main>
        </div>
    );
}

export default Listing;