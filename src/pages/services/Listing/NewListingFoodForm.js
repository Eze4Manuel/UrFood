import React, { useState } from 'react';
import './NewListingFoodForm.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import helpers from '../../../core/func/Helpers';
import lib from './lib';
import { useAuth } from '../../../core/hooks/useAuth';

const NewListingFoodForm = (props = { onSubmit: null, onHide: null, show: false }) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [city,] = useState(null);
    const [lazyVendorLoading, setLazyVendorLoading] = useState(false);
    const [lazyFoodLoading, setLazyFoodLoading] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [dataFood, setFoodData] = useState([]);
    const [foodAuth, setFoodAuth] = useState('');
    const [vendorAuth, setVendorAuth] = useState('');
    const [selectedFoodner, setSelectedFoodner] = useState(null);
    const [lazyVendorItems, setLazyVendorItems] = useState([]);
    const [lazyFoodItems, setLazyFoodItems] = useState([]);
    const { set, user } = useAuth();
    const [vendorData, setVendorData] = useState(null);

    const handleSubmit = () => {
        let builder = formValidator.validateNewFoodListing(values, {}, setError);
        console.log(builder);
        if (!builder) {
            return
        }
        // submit
        props.onSubmit(builder, setLoading, setError, setValues, config.userData)
    }

    const mapVendor = (data) => {
        return data?.map(d => {
            let pd = d?.vendor_data
            return {
                vendor_id: pd?._id,
                vendor_name: pd?.name
            }
        })
    }

    const discount = [
        { name: 'percentage', code: 'percentage' },
        { name: 'amount', code: 'amount' }
    ];

    const onLazyVendorChange = (e) => {
        setSelectedVendor(e.value);
        setVendorAuth(vendorData?.find(val => {
            if (val.vendor_name === e.value) {
                setValues({...values, vendor_id: val.vendor_id })
                return val;
            }
        }))
    }
    const onLazyFoodItemChange = (e) => {
        setSelectedFoodner(e.value);
        setFoodAuth(dataFood?.find(val => {
            if (val.name === e.value){
                setValues({...values, food_id: val._id })
                return val;
            } 
        }))
    }


    // vendor lazy loading
    const onLazyVendorLoad = async (event) => {
        setLazyVendorLoading(true);
        let reqData = await lib.getVendors(user?.token, 'vendor')
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            setLazyVendorItems(reqData.data.map(e => e.vendor_data.name));
            setVendorData(mapVendor(reqData.data));
        }
        setLazyVendorLoading(false);
    }

    // food lazy loading
    const onLazyFoodLoad = async (event) => {
        setLazyFoodLoading(true);
        let reqData = await lib.getFoods(user?.token)
        if (reqData.status === "error") {
            helpers.sessionHasExpired(set, reqData.msg)
        }
        if (reqData.status === 'ok') {
            setFoodData(reqData.data);
            setLazyFoodItems(reqData.data?.map(e => e.name));
        }
        setLazyFoodLoading(false);
    }

    return (
        <Dialog header="New Food Listing" visible={props.show} modal onHide={() => props.onHide()} style={{ width: "45vw" }}>
            <div>
                <div className="user-form__button-wp">
                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                </div>
                {error ? <ErrorMessage message={error} /> : null}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="vendor">Select Vendor</label><br />
                            <Dropdown style={{ width: '100%', height: '35px' }} value={selectedVendor} options={lazyVendorItems} onChange={onLazyVendorChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyVendorLoad, itemSize: 31, showLoader: true, loading: lazyVendorLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="p-d-flex p-ai-center p-p-2" style={{ height: '31px' }}>
                                            <Skeleton width={options.even ? '80%' : '70%'} height="2rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select vendor" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="food">Select Food</label><br />
                            <Dropdown style={{ width: '100%', height: '35px' }} value={selectedFoodner} options={lazyFoodItems} onChange={onLazyFoodItemChange} virtualScrollerOptions={{
                                lazy: true, onLazyLoad: onLazyFoodLoad, itemSize: 31, showLoader: true, loading: lazyFoodLoading, delay: 250, loadingTemplate: (options) => {
                                    return (
                                        <div className="p-d-flex p-ai-center p-p-2" style={{ height: '31px' }}>
                                            <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                                        </div>
                                    )
                                }
                            }} placeholder="Select Food" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="vendor_id">Vendor ID*</label><br />
                            <InputText  disabled style={{ width: '100%' }} id="vendor_id" name="vendor_id" onChange={e => setValues(d => ({ ...d, vendor_id: vendorAuth?.vendor_id }))} autoFocus value={vendorAuth?.vendor_id} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Vendor ID" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="food_id">Food ID*</label><br />
                            <InputText disabled style={{ width: '100%' }} id="food_id" name="food_id" type="text" onChange={e => setValues(d => ({ ...d, food_id: foodAuth?._id }))} value={foodAuth?._id} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Food ID" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-1">
                            <label htmlFor="price">Price*</label><br />
                            <InputText style={{ width: '100%' }} id="price" name="price" onChange={e => setValues(d => ({ ...d, price: e.target.value }))} value={values?.price} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="price" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="city">Quantity*</label><br />
                            <InputText style={{ width: '100%' }} id="quantity" name="quantity" type="text" onChange={e => setValues(d => ({ ...d, quantity: e.target.value }))} value={values?.quantity} className="p-inputtext-sm p-d-block p-mb-2" placeholder="Quantity" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-field mb-2">
                            <label htmlFor="discount_amount">Discount Amount</label><br />
                            <InputText style={{ width: '100%' }} id="discount_amount" name="discount_amount" type="text" onChange={e => setValues(d => ({ ...d, discount_amount: e.target.value }))} value={values?.discount_amount} className="p-inputtext-sm p-d-block p-mb-2" placeholder="20" />
                        </div>
                    </div>
                    <div className="col-lg-6 dropdown-demo">
                        <div className="p-field mb-2">
                            <label htmlFor="discount_type">Discount Type*</label><br />
                            <Dropdown value={{ name: values?.discount_type, code: values?.discount_type }} options={discount} name="discount_type" onChange={e => setValues(d => ({ ...d, discount_type: e.value.code }))} optionLabel="name" placeholder="Discount Type" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="city">Available Status</label><br />
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="availability_status" name="availability_status" value="true" onChange={e => setValues(d => ({ ...d, availability_status: e.target.value }))} checked={values?.availability_status === 'true'} />
                            <label htmlFor="availability_status" style={{ "marginRight": "15px" }} >True</label>

                            <RadioButton inputId="availability_status" name="availability_status" value="false" onChange={e => setValues(d => ({ ...d, availability_status: e.target.value }))} checked={values?.availability_status === 'false'} />
                            <label htmlFor="availability_status">False</label>
                        </div>
                    </div>
                </div>
                <div className="partner-form__button-wp">
                    <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Create" />
                </div>
            </div>
        </Dialog>
    )
}

export default NewListingFoodForm;
