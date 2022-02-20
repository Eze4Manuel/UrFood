import React, { useEffect, useState } from 'react';
import './LocationSummary.css';
import { Dialog } from 'primereact/dialog';
import lib from './lib';
import Table from '../../components/table';
import { useAuth } from '../../core/hooks/useAuth';
import { getPageCount, getPages, goTo, onSetPage } from '../../core/func/utility';
import Tabs from "../../components/tabs/Tabs";
import NoData from '../../components/widgets/NoData';
import { InputText } from 'primereact/inputtext';
import Spinner from 'react-loader-spinner';
import ErrorMessage from '../../components/error/ErrorMessage';
import { Button } from 'primereact/button';
import helpers from '../../core/func/Helpers';
import { useNotifications } from '@mantine/notifications';
import LocationUserData from './LocationUserData';
import Flash from '../../components/flash/Flash';

const noDataTitle = "No location available yet.";
const noDataParagraph = "There currently is no location yet";

const deleteWarning = "Are you sure you want to delete this location. This action is not reversible."


const LocationSummary = ({ data, show, onHide, onDeleted }) => {
    const { set, user } = useAuth();
    const [locationData, setLocationData] = React.useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [, setLoader] = useState(false);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [openData, setOpenData] = useState(false);
    const [activePage, setActivePages] = useState(1);
    const [order, setOrder] = useState("Location Details");
    const notify = useNotifications();
    const [delWarning, setDelWarning] = React.useState(false);
    const [values, setValues] = React.useState();
    const [addAreaValues, setAddAreaValues] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        fetchData()
        setDelWarning(false);
    }, [])

    const fetchData = async () => {
        setLoading(true);
        let reqData = await lib.getOne(data?._id, user?.token)
        setLoading(false);
        if (reqData.status === "ok") {
            setLocationData(reqData.data);
            setValues(reqData.data);
        }
    }

    const perPageA = getPageCount(10);
    const paginateA = getPages(data?.areas?.length, perPageA);
    const startA = (activePage === 1) ? 0 : (activePage * perPageA) - perPageA;
    const stopA = startA + perPageA;
    const areaData = locationData?.area_data?.slice(startA, stopA);


    const addArea = async () => {
        setLoading(true);
        let payload = { ...addAreaValues, location_id: locationData?._id }
        let reqData = await lib.createArea(payload, user?.token)
        setLoading(false);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setAddAreaValues({})
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Area created' })
        }
    }

    const updateLocation = async () => {
        setLoading(true);
        let reqData = await lib.updateLocation(locationData?._id, values, user?.token)
        setLoading(false);
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg, setError)
        }
        if (reqData.status === "ok") {
            setLocationData({ locationData, ...reqData.data })
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Location updated' })
        }
    }

    const deleteAccount = async () => {
        setError('')
        setDelWarning(false);
        setLoading(true)
        let reqData = await lib.deleteLocation(values?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?._id)
            onHide()
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Location deleted' })
        }
    }

    const deleteArea = async (id) => {
        // close modal
        setOpenData(false)
        // remove from data list
        let d = locationData?.area_data?.filter(val => (String(val?._id) !== String(id)))
        setLocationData({...locationData, area_data: d})
    }

    const updateArea = async (updatedData) => {
        // close modal
        setOpenData(false)
        // remove from data list
        let d = locationData?.area_data?.map(val => {
            if(String(val?._id) === String(updatedData?._id)){
                return {...val, ...updatedData}
            }
            return val
        })
        setLocationData({...locationData, area_data: d})
    }

    const onProdSelected = async (value) => {
        setLoader(true)
        let reqData = await lib.getOneArea(value?._id, user?.token)
        if (reqData.status === 'ok' && reqData?.data) {
            setSelected(reqData.data)
        }
        setLoader(false)
        setOpenData(true)
    }

    const fetchMoreProd = (page, key, set) => {
        onSetPage(page, key, set)
    }     

    const changeTab = (val) => {
        switch (val) {
            case 'Location Details':
                fetchData()
                setActiveIndex(0)
                setOrder(val);
                break;
            case 'Delete Location':
                setActiveIndex(1)
                setOrder(val);
                setDelWarning(true);
                break;
            case 'Add Area':
                setOrder(val)
                setActiveIndex(2)
                break;
            case 'Update Location':
                setOrder(val)
                setActiveIndex(3)
                break;
            default:
                break;
        }
    }
    return (
        <Dialog closeOnEscape header={`${locationData?.name} details`} visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            <LocationUserData onAreaDeleted={(id) => deleteArea(id)} onAreaUpdated={(id) => updateArea(id)} data={selected} show={openData} onHide={() => setOpenData(false)} />

            <Tabs onChangeTab={(val) => changeTab(val)} activeTab={order} tabs={["Location Details", "Add Area", "Update Location", "Delete Location",]} />
            {activeIndex === 0 ?
                <>
                    {(locationData?.areas.length === 0) ? <NoData title={noDataTitle} paragraph={noDataParagraph} /> :
                        <>
                            <Table
                                onSelectData={onProdSelected}
                                prev={() => fetchMoreProd(page, 'prev', setPage)}
                                next={() => fetchMoreProd(page, 'next', setPage)}
                                goTo={(id) => goTo(id, setActivePages)}
                                activePage={activePage}
                                pages={paginateA}
                                data={areaData}
                                perPage={perPageA}
                                route="" // {config.pages.user}
                                tableTitle=""
                                tableHeader={['#', 'ID', 'Name']}
                                dataFields={['_id', 'name']}
                            />
                        </>
                    }
                </>
                :
                // Add New Area
                activeIndex === 2 ?
                    <div className="product-summary__ctn mt-5">
                        <div>
                            <div className="user-form__button-wp">
                                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                            </div>
                            {error ? <ErrorMessage message={error} /> : null}
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="p-field mb-2">
                                        <label htmlFor="name">Area</label><br/>
                                        <InputText style={{ width: '100%' }} id="name" name="name" onChange={e => setAddAreaValues(d => ({ ...d, name: e.target.value }))} autoFocus value={addAreaValues?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder='Area name' />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="p-field mb-2">
                                        <label htmlFor="city">City</label><br/>
                                        <InputText style={{ width: '100%' }} id="city" name="city" type="text" onChange={e => setAddAreaValues(d => ({ ...d, city: e.target.value }))} value={addAreaValues.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder="city" />
                                    </div>
                                </div>
                            </div>
                            <div className="user-form__button-wp">
                                <Button onClick={() => addArea()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                            </div>
                        </div>
                    </div>
                    :
                    // Update location
                    activeIndex === 3 ?
                        <div className="product-summary__ctn mt-5">
                            <div>
                                <div className="user-form__button-wp">
                                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                                </div>
                                {error ? <ErrorMessage message={error} /> : null}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="p-field mb-2">
                                            <label htmlFor="name">Location Name</label><br/>
                                            <InputText style={{ width: '100%' }} id="name" name="name" onChange={e => setValues(d => ({ ...d, name: e.target.value }))} autoFocus value={values.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder={locationData?.name} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-field mb-2">
                                            <label htmlFor="city">City</label><br />
                                            <InputText style={{ width: '100%' }} id="city" name="city" type="text" onChange={e => setValues(d => ({ ...d, city: e.target.value }))} value={values.city} className="p-inputtext-sm p-d-block p-mb-2" placeholder={locationData?.city} />
                                        </div>
                                    </div>
                                </div>
                                <div className="user-form__button-wp">
                                    <Button onClick={() => updateLocation()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Update" />
                                </div>
                            </div>
                        </div>
                        :
                        // Delete Location
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />

            }
        </Dialog>
    )
}

export default LocationSummary
