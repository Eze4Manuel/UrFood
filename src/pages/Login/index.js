import React, { useState } from 'react';
import './login.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
// import request from '../../assets/utils/http-request';  
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
        // check username
        if (!values.username) {
            setError('username is required')
            return
        }
        userData.username = values.username
        
        // check password
        if (!values.password) {
            setError('password is required')
            return
        }
        userData.password = values.password
        // set user type
        let userType = values.username.toLowerCase() === 'urdispatch' ? 'superadmin' : 'admin'
        userData.user_type = userType

        const fauth = async () => {
            setError('')
            setLoading(true) 
            setTimeout(() => {
                let fakeUser  = {email: "superadmin@urfood.ng", access_level: 4, phone_number: "08122334455", user_type: "superadmin", auth_id: "5656ghs3387383738hh"}
                setLoading(false) 
                Helpers.loadUserInStore(fakeUser)
                set(fakeUser)
            }, 3000)
        }
        //TODO: Replace
        await fauth()
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
                                            <label htmlFor="username">Username</label><br />
                                            <InputText style={{width: '100%'}} id="username" name="username" onChange={e => setValues(d => ({...d, username: e.target.value}))} autoFocus value={values.username} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="username" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="p-field mb-2">
                                            <label htmlFor="password">Password</label><br />
                                            <Password style={{ width: '100%' }} id="password" name="password" type="text" toggleMask value={values.password} onChange={e => setValues(d => ({...d, password: e.target.value}))} placeholder="**********" />
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
