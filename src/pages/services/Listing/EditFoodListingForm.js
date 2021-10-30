import React from 'react';
import './NewListingFoodForm.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import config from '../../../assets/utils/config';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import formValidator from './formvalidation';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import lib from './lib';
import helpers from '../../../core/func/Helpers';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';


const EditFoodListingForm = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setValues(data)
    }, [data])


    const discount = [
        {name: 'percentage', code: 'percentage'},
        {name: 'amount', code: 'amount'}
    ];

    const handleSubmit = async () => {
        let builder = formValidator.validateListingFoodUpdate(values, data, {}, setError)
        if (!builder) {
            return
        }
        // update
        setLoading(true);
        let reqData = await lib.updateListedFood(builder, data?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data })
            onUpdated({ ...data, ...reqData.data })
        }
    }

    return show ? (
        <div className="container px-5">
            <div className="mb-4 mt-4"><h6>Update Food</h6></div>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div>
            {error ? <ErrorMessage message={error} /> : null}

            <div className="row">
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="price">Price*</label><br />
                        <InputText style={{ width: '100%' }} id="price" name="price" type="text" onChange={e => setValues(d => ({ ...d, price: e.target.value }))} value={values?.price} className="p-inputtext-sm p-d-block p-mb-2" placeholder="price" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="quantity">Quantity*</label><br />
                        <InputText style={{ width: '100%' }} id="quantity" name="quantity" type="text" onChange={e => setValues(d => ({ ...d, quantity: e.target.value }))} value={values?.quantity} className="p-inputtext-sm p-d-block p-mb-2" placeholder="quantity" />
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-lg-12 dropdown-demo">
                    <div className="p-field mb-2">
                        <label htmlFor="discount_type">Discount Type*</label><br />
                        <Dropdown value={{name: values?.discount_type, code: values?.discount_type}} options={discount} name="discount_type" onChange={e => setValues(d => ({ ...d, discount_type: e.value.code }))} optionLabel="name" placeholder="Discount Type" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="discount_amount">Discount Amount*</label><br />
                        <InputText style={{ width: '100%' }} id="discount_amount" name="discount_amount" type="text" onChange={e => setValues(d => ({ ...d, discount_amount: e.target.value }))} value={values?.discount_amount} className="p-inputtext-sm p-d-block p-mb-2" placeholder="discount_amount" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <label htmlFor="availability_status">Availability Status</label><br />
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="availability_status" name="availability_status" value="true" onChange={e => setValues(d => ({ ...d, availability_status: e.target.value }))} checked={values?.availability_status === true} />
                        <label htmlFor="availability_status" style={{ "marginRight": "15px" }} >True</label>
                        <RadioButton inputId="availability_status" name="availability_status" value="false" onChange={e => setValues(d => ({ ...d, availability_status: e.target.value }))} checked={values?.availability_status === false} />
                        <label htmlFor="availability_status">False</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="p-field mb-2">
                        <label htmlFor="description">Description</label><br />
                        <InputTextarea style={{ width: '100%' }} id="description" name="description" onChange={e => setValues(d => ({ ...d, description: e.target.value }))} value={values?.description} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="description" />
                    </div>
                </div>
            </div>
            <div className="foods-form__button-wp">
                <Button onClick={() => handleSubmit()} style={{ width: 100, height: 30 }} loading={loading} color="#fff" label="Save" />
            </div>
        </div>
    ) : null
}

export default EditFoodListingForm;
