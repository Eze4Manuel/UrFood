import React, { Fragment } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import config from './config';
import { useAuth } from '../../core/hooks/useAuth';
import helpers from '../../core/func/Helpers';
import Flash from '../../components/flash/Flash';

const Sidebar = (props) => {
    const { set } = useAuth();
    const [delWarning, setDelWarning] = React.useState(false);

    const sidebarLinks = config.sidebar.map(cfg => {
        if (cfg.divider === 'dashboard'
            && !props?.user?.user_type !== 'superadmin'
            && props?.user?.user_type === 'admin') {
            return null;
        }

        const deleteAccount = async (name) => {
            if (name === 'logout') {
                setDelWarning(true)

            }
        }

        const onLogout = (name) => {
            if (name === 'logout') {
                helpers.logout(set);
            }
        }
        const deleteWarning = "Are you sure you want to logout of this account?"

        return (
            <Fragment>
                <div className="menu-head">
                    <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => onLogout('logout')} />

                    <span className="text-capitalize">{cfg.divider}</span>
                </div>
                <ul>
                    {cfg.sub.map(sub => {
                        if (sub.name === 'settings' && props?.user?.user_type === 'superadmin') {
                            return null
                        }
                        if (sub.name === 'support' && props?.user?.user_type === 'admin') {
                            return null
                        }
                        return (
                            <li onClick={() => deleteAccount(sub.name)} key={sub.name}>
                                <Link to={sub.link}>
                                    <span className={sub.icon}></span>{sub.name}
                                </Link>
                            </li>
                        )
                    })
                    }
                </ul>
            </Fragment>
        )
    }
    );

    return (
        <div className="sidebar sidebar_wp">
            <div className="sidebar-brand">
                <div className="brand-flex">
                    <div className="brand-icons">
                        <span>Camels Logistics</span>
                    </div>
                </div>
            </div>
            <hr style={{ background: '#fff' }} />
            <div className="sidebar-main">
                <div className="sidebar-user">
                    <div>
                        <h3>
                            {props?.user?.username}<br />
                            <span style={{ color: '#91A0AF' }} className="user-id small text-uppercase">
                                {props?.user?._id ?? props?.user?.auth_id}
                            </span>
                        </h3>
                    </div>
                </div>
                <div className="sidebar-menu">
                    {sidebarLinks}
                </div>
            </div>
        </div>
    );
}


export default Sidebar;