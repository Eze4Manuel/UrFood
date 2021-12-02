import React from 'react';
import './NewFoodForm.css';
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




const EditFoodForm = ({ data, show, onUpdated }) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setValues(data)
    }, [data])

    const handleSubmit = async () => {
        let builder = formValidator.validateFoodUpdate(values, data, {}, setError)
        if (!builder) {
            return
        } 
        // update
        setLoading(true);
        let reqData = await lib.updateFood(builder, data?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'update successful' })
            setValues({ ...data, ...reqData.data, foods_data: { ...data.foods_data, name: reqData.data.name, registration_id: reqData.data.registration_id } })
            onUpdated({ ...data, ...reqData.data, foods_data: { ...data.foods_data, name: reqData.data.name, registration_id: reqData.data.registration_id } })
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
                        <label htmlFor="name">Name*</label><br />
                        <InputText style={{ width: '100%' }} id="name" name="name" type="text" onChange={e => setValues(d => ({ ...d, name: e.target.value }))} value={values?.name} className="p-inputtext-sm p-d-block p-mb-2" placeholder="name" />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-2">
                        <label htmlFor="ingredients">Ingredients*</label><br />
                        <InputText style={{ width: '100%' }} id="ingredients" name="ingredients" type="text" onChange={e => setValues(d => ({ ...d, ingredients: e.target.value }))} value={values?.ingredients} className="p-inputtext-sm p-d-block p-mb-2" placeholder="ingredients" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <label htmlFor="city">Listing Status</label><br />
                    <div className="p-field-radiobutton">
                        <RadioButton inputId="listing_status" name="listing_status" value="true" onChange={e => setValues(d => ({ ...d, listing_status: e.target.value }))} checked={values?.listing_status === true} />
                        <label htmlFor="listing_status" style={{ "marginRight": "15px" }} >True</label>

                        <RadioButton inputId="listing_status" name="listing_status" value="false" onChange={e => setValues(d => ({ ...d, listing_status: e.target.value }))} checked={values?.listing_status === false} />
                        <label htmlFor="listing_status">False</label>
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

export default EditFoodForm;
