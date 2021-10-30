
import React, { useEffect, useState } from 'react';
import './ListingSummary.css';
import { Dialog } from 'primereact/dialog';
import lib from './lib';
import Table from '../../../components/table';
import { useAuth } from '../../../core/hooks/useAuth';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import NoData from '../../../components/widgets/NoData';
import helpers from '../../../core/func/Helpers';
import ListingData from './ListingData';
import ListingFoodUpdate from './ListingFoodUpdate';
import { ContainerLoader } from '../../../components/loading/Loading';
import Tabs from "../../../components/tabs/Tabs";
import Flash from '../../../components/flash/Flash';
import ErrorMessage from '../../../components/error/ErrorMessage';
import { useNotifications } from '@mantine/notifications';


const noDataTitle = "Fetching Listing";
const noDataParagraph = "Listing currently being fetched";
const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."



const ListingSummary = ({ data, show, onHide, onDeleted }) => {
    const { set, user } = useAuth();
    const [pharmData, setPharmData] = React.useState([]);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [openData, setOpenData] = useState(false);
    const [activePage, setActivePages] = useState(1);
    const [,] = useState("Listing");
    const [loader, setLoader] = useState(false);
    const [order, setOrder] = useState("Update");
    const [, setActiveIndex] = useState(0);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [, setLoading] = React.useState(false);
    const notify = useNotifications();
    const [showUpdate, setShowUpdate] = React.useState(false);

    useEffect(() => {
        (async () => {
            setLoader(true);
            let reqData = await lib.getSingleListng(page, data?.vendor, '', user?.token);
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setPharmData(fQeury(reqData.data));
            }
            setLoader(false);
            setDelWarning(false);
        })()
    }, [set, page, data, user?.token]);

    const perPageA = getPageCount(10);
    const paginateA = getPages(pharmData?.length, perPageA);
    const startA = (activePage === 1) ? 0 : (activePage * perPageA) - perPageA;
    const stopA = startA + perPageA;
    const viewData = pharmData?.slice(startA, stopA);


    const fQeury = (data) => {
        return data.map(d => {
            let px = d.food || []
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

    const changeTab = (val) => {
        switch (val) {
            case 'Update':
                setShowUpdate(true);
                setActiveIndex(0)
                setOrder(val);
                break;
            case 'Delete':
                setActiveIndex(1)
                setShowUpdate(false);
                setDelWarning(true)
                setOrder(val)
                break;
            default:
                break;
        }
    }

    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.deleteListing(data?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?.auth_id)
            onHide()
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Listing deleted' })
        }
    }

    const onProdSelected = async (value) => {
        setLoader(true);
        let reqData = await lib.getOne(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }
    const fetchMoreProd = (page, key, set) => {
        onSetPage(page, key, set)
    }

    return (
        <>
            <Dialog closeOnEscape header="Vendor List Summary" visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
                <>
                    {loader ? <ContainerLoader /> : null}
                    {(pharmData?.length === 0) ?
                        <NoData title={noDataTitle} paragraph={noDataParagraph} />
                        :
                        <>
                            <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["Update", "Delete"]} />
                            <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                            {error ? <ErrorMessage message={error} /> : null}
                            <Table
                                onSelectData={onProdSelected}
                                prev={() => fetchMoreProd(page, 'prev', setPage)}
                                next={() => fetchMoreProd(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginateA}
                                data={viewData}
                                perPage={perPageA}
                                route=""
                                tableTitle=""
                                tableHeader={['#', 'Name', 'Category', 'Price', 'quantity']}
                                dataFields={['name', 'category', 'price', 'quantity']}
                            />
                            <ListingData onUpdated={(data) => setSelected(data)} onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => { setOpenData(false) }} />
                            <ListingFoodUpdate onUpdated={(data) => setSelected(data)} onDeleted={(id) => onDeleted(id)} data={data} show={showUpdate} onHide={() => { setShowUpdate(false) }} />
                        </>
                    }

                </>

            </Dialog>


        </>
    )
}

export default ListingSummary;


