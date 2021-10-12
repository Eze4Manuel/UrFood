import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AppContext from '../../core/context/Store';

const Navigation = (props) => {
    const appState = useContext(AppContext)?.state;
    return (
        <div>
            <Sidebar appState={appState} {...props}/>
            <Navbar  appState={appState} {...props}/>
        </div>
    );
}


export default Navigation;