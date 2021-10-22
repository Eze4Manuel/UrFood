import React from 'react';
import './Setting.css';
 import './data';
// import { useAuth } from '../../core/hooks/useAuth';
// import request from '../../assets/utils/http-request';
// import helpers from '../../core/func/Helpers';
import Spinner from 'react-loader-spinner'
import { profileData } from './data';
import EditPassword from './EditPassword';


const Setting = (props) => {
    // const { user, set } = useAuth()
    const [values, ] = React.useState(profileData);
    // const [, setProfile] = React.useState(profileData);
    // const [, setError] = React.useState("");
    const [loading, ] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className='main-content'>
            <main style={{ background: '#fff' }}>
                <div className="profile__container">
                    <h6 className="font-weight-bold mt-3 mb-5 ml-3">USER SETTINGS &amp; PROFILE</h6>
                    <div className="setting-info__ctn">         
                        <div className="row">
                            <div className="col-12 mt-2">
                                <div className="setting-form__button-wp">
                                    {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                                </div>
                            </div>
                            <div className="col-12">
                                {/* EDIT PASSWORD */}
                                <EditPassword onHide={() => setShowPassword(false)} data={values} show={!showPassword} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Setting;