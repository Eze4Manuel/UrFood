import React, { useEffect, useState } from 'react';
import './Vendor.css';
import SubNavbar from '../../../components/subnavbar';
import NoData from '../../../components/widgets/NoData';
import lib from './lib';
import Table from '../../../components/table';
import { getPageCount, getPages, goTo, onSetPage } from '../../../core/func/utility';
import NewVendorForm from './NewVendorForm';
import { ContainerLoader } from '../../../components/loading/Loading';
import VendorUserData from './VendorUserData'
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import Alert from '../../../components/flash/Alert';
import helpers from '../../../core/func/Helpers';

const noDataTitle = "You haven't created any vendor account yet.";
const noDataParagraph = "You can create a vendor yourself by clicking on the button Add vendor.";

const fQeury = (data) => {
    return data?.map(d => {
        let pd = d?.vendor_data
        return {
            phone_number: pd?.phone_number,
            vendor_name: pd?.name,
            area: pd?.area,
            city: pd?.city,
            address: pd?.address,
            ...d,
            vendor_id: pd?._id,
        }
    })
}


const processor = (d) => {
    let pd = d?.vendor_data
    return {
        phone_number: pd?.phone_number,
        vendor_name: pd?.name,
        area: pd?.area,
        city: pd?.city,
        address: pd?.address,
        ...d,
        vendor_id: pd?._id,
    }
}

const Vendor = (props) => {
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

    // data 
    useEffect(() => {
        (async () => {
            setLoader(true)
            let reqData = await lib.get(page, null, user?.token, 'vendor')
            if (reqData.status === "error") {
                helpers.sessionHasExpired(set, reqData.msg)
            }
            if (reqData.status === 'ok') {
                setData(fQeury(reqData.data))
            }
            setLoader(false);
        })();

    }, [user?.token, page, set])

      

    // setup table data
    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage); 
    const start = (activePage === 1) ? 0 : (activePage*perPage)  - perPage;
    const stop = start+perPage;
    const viewData = data.slice(start, stop);

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
        setLoader(true);
        let reqData = await lib.get(1, searchInput, user?.token, 'vendor')
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
            setData([processor(reqData.data), ...data])
            helpers.alert({notifications: notify, icon: 'success', color: 'green', message: 'Vendor account created'})
            await reload()
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
         let d = data?.filter(val => (String(val?.auth_id) !== String(id)))
         setData(fQeury(d))
         await reload()
    }

    return (
        <div className="main-content">
            <main>
                {loader ? <ContainerLoader /> : null}
                <Alert onCancel={() => setNotFound(false)} show={notFound} title="Notification" message="No match found" />
                <NewVendorForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_vendor"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for vendor..."
                    ariaLabel="vendor"
                    ariaDescription="vendor"
                    onSearch={() => onSearch()}
                    searchInput={searchInput} 
                    onChangeInput={setSearchInput}
                    searchID="search_vendor"
                    buttonTitle="Add Vendor"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                {viewData.length === 0 ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> : null}
                <VendorUserData onUpdated={(data) => setSelected(data)} onDeleted={(id) => onDeleted(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />
                {
                    viewData.length > 0
                    ? (
                        
                        <div className="vendor-table__container">
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
                                tableTitle="Vendor" 
                                tableHeader={['#','ID', 'Vendor Name',  'Phone']}
                                dataFields={['vendor_id', 'vendor_name', 'phone_number']}
                            />
                        </div>
                    )
                    : null
                }
            </main>
        </div>
    )
}

export default Vendor
