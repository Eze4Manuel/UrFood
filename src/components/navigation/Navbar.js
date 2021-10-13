import React, { Fragment, useState } from 'react';
import './Navbar.css';

import {Link} from 'react-router-dom';
import './Navbar.css';
import { useHistory } from 'react-router-dom';
import Helpers from '../../core/func/Helpers';
import { useAuth } from '../../core/hooks/useAuth';
import config from '../../assets/utils/config';

const Navbar = (props) => {
    const history = useHistory();
    const [show,setShow] = useState(false);
    const {set} = useAuth();

    const handleUserLogout = () => {
        Helpers.logout(set)
    }

    const onHideSidebar = () => {
        // TODO: hide siode bar
        // const sb = document.querySelector('.sidebar_wp');
        // sb?.classList?.toggle('hide_sidebar');
    }

    return (
        <header className="header p-shadow-1 subnav-container">
            <div className="menu-toggle">
                <label for="" >
                    {/* TODO: Click to hide sidebar */}
                    <span onClick={() => onHideSidebar()} className="las la-bars icon_hover"></span>
                </label>
            </div>
            <div className="header-icons">
                <span onClick={() => history.push(config.pages.messages)} className="las la-comment icon_hover"></span>
                <span onClick={() => setShow(!show)} className="las la-user-circle icon_hover"></span>
                <div className={`navbar-dropdown ${show ? 'navbar-dropdown-visible': ''}`}>
                    {
                        props?.user?.user_type === 'superadmin' 
                        ? null
                        : (
                            <Fragment>
                                <Link className="navbar-dropdown-link link-flex" to={config.pages.settings}>
                                    <span className="las la-user icon_hover pr-2"></span>Settings
                                </Link>
                                <div className="hr"/>
                            </Fragment>
                        ) 
                    }
                    <Link className="navbar-dropdown-link link-flex" onClick={() => handleUserLogout()}>
                        <span className="las la-sign-out-alt icon_hover pr-2"></span>Logout
                    </Link>
                </div>
            </div>
        </header>
    );
}


export default Navbar;