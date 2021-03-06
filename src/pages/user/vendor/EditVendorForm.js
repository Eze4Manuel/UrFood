import React, { useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import ErrorMessage from '../../../components/error/ErrorMessage';
import Spinner from 'react-loader-spinner';
import { Password } from 'primereact/password';
import './EditVendorForm.css';
import lib from './lib';
import { useAuth } from '../../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../../core/func/Helpers';

export const EditPassword = ({ data, show, onHide }) => {
    const [values, setValues] = React.useState({new_password: '', confirm_password: ''});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const { set, user } = useAuth();
    const notify = useNotifications();

    useEffect(() => {
        setValues(data);
    }, [data])

    const onSubmit = async () => {
        let builder = {}

        // validate password
        setError('')
        //check if its above minimum number
        if (!values.new_password) {
            setError("New password is required")
            return
        }
        if (values.new_password.length < 6) {
            setError("New password must be 6 characters or more")
            return
        }
        //check if its above minimum number
        if (values.new_password.length > 15) {
            setError("New assword must be less than 15 characters")
            return
        }
        //check if there's capital letter
        if (!/[A-Z]/.test(values.new_password)) {
            setError("New assword must have atleast one capital letter")
            return
        }
        //check if there's small letter
        if (!/[a-z]/.test(values.new_password)) {
            setError("New assword must have atleast one small letter")
            return
        }
        //check if there's number
        if (!/[0-9]/.test(values.new_password)) {
            setError("New assword must have atleast one number")
            return
        }

        if (!values.confirm_password) {
            setError('Confirm password is required')
            return
        }
        if (values.new_password !== values.confirm_password) {
            setError('Passwords do not match')
            return
        }
        // submit the password
        builder.password = values.new_password;
        builder.auth_id = data?.auth_id
        setLoading(true);

        let reqData = await lib.updatePassword(builder, user?.token)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'password updated' })
        }
        setLoading(false);

        // update
    }

    const onCancel = () => {
        setError('')
        setLoading(false)
        onHide()
    }

    const footer = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{lineHeight: '1.5'}}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 6 characters</li>
            </ul>
        </React.Fragment>
    );
  
    return show ? (
        <div className="container px-5">
            <h6 className="mb-1 mt-3">Update Password</h6>
            <div className="user-form__button-wp">
                {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
            </div> 
            {error ? <ErrorMessage message={error} /> : null}
            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="new_password">New Password</label><br />
                        <Password footer={footer} minLength={6} maxLength={24} id="new_password" name="new_password" type="text" onChange={e => setValues(d => ({...d, new_password: e.target.value}))} value={values?.new_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="p-field mb-1">
                        <label htmlFor="confirm_password">Comfirm Password</label><br />
                        <Password footer={footer} minLength={6} maxLength={24} id="password" name="password" type="text" onChange={e => setValues(d => ({...d, confirm_password: e.target.value}))} value={values?.confirm_password} className="p-inputtext-sm" placeholder="********" toggleMask />
                    </div>
                </div>
            </div> 
            <div className="password-update__btn-ctn">
                <button onClick={() => onCancel()} style={{width: 100, height: 30}} class="p-button p-component p-button-outlined"><span class="p-button-label p-c">Cancel</span></button>
                <Button onClick={() => onSubmit()} style={{width: 100, height: 30}} loading={loading} color="#fff" label="Update"/>
            </div> 
        </div>
    ) : null
}


