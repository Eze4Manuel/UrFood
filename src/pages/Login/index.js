import React, { useState } from 'react';
import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import request from '../../assets/utils/http-request';  
import { useAuth } from '../../core/hooks/useAuth';
import ErrorMessage from '../../components/error/ErrorMessage'
import Helpers from '../../core/func/Helpers';

const Login = (props) => {
    const { set } = useAuth();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState({ username: '', password: ''})

    const onSubmit = async (e) => {
        let userData = {}
        // check phone_number
        if (!values.phone_number) {
            setError('phone number is required')
            return
        }
        userData.phone_number = values.phone_number
        
        // check password
        if (!values.password) {
            setError('password is required')
            return
        }
        userData.password = values.password
        // set user type
        let userType = values.phone_number.toLowerCase() === '08111111111' ? 'superadmin' : 'admin'
        userData.user_type = userType
        
        setError('')
        setLoading(true)
        try {
            let reqData = await (await request.post('/auth/login', userData)).data
            setLoading(false)
            console.log(reqData);
            if (reqData.status === 'error') {
                setError(reqData?.msg)
            }
            if (reqData.status === 'ok' && ['admin', 'superadmin'].indexOf(reqData?.data?.user_type) === -1) {
                setError("You do not have the right authorization for this resource")
            } else {
                Helpers.loadUserInStore(reqData?.data)
                set(reqData?.data)
            }
        } catch (err) {
            setLoading(false)
            setError(err?.response?.data?.msg || err?.message)
        }
    };

    return (
        <div className="app-login">
            <div className="app-login__container">
                <div className="app-login__content">
                    <h3 className="text-center">Login</h3>
                    <div className="app-login__error">
                        {error ? <ErrorMessage message={error} /> : null}
                    </div>
                    <div className="p-fluid p-formgrid p-grid p-mx-5">
                            <div style={{width: '350px'}} className="container">
                            <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="phone_number">Phone Number</label><br />
                                            <InputText style={{width: '100%'}} id="phone_number" name="phone_number" onChange={e => setValues(d => ({...d, phone_number: e.target.value}))} autoFocus value={values.phone_number} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="phone_number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="password">Password</label><br />
                                            <Password style={{ width: '100%', height: '35px'}} id="password" name="password" type="text" toggleMask value={values.password} onChange={e => setValues(d => ({...d, password: e.target.value}))} placeholder="**********" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mt-2">
                                            <Button onClick={() => onSubmit()} style={{width: '100%'}} loading={loading} color="#fff" label="Login"/>
                                        </div>
                                    </div>
                            </div> 
                            </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login
