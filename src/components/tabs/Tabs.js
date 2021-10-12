import React from 'react';
import './Tab.css';

const Tabs = ({ activeTab, tabs = [], onChangeTab }) => {

    const onChange = (val) => {
        if (typeof onChangeTab === 'function') {
            onChangeTab(val)
        }
    }

    const renderTabs = tabs.map(val => <button onClick={() => onChange(val)} className={`btn tab-btn ${activeTab === val ? "tab-btn__active" : ""}`}>{val}</button>)

    return (
        <div>
           <div className="container">
            <div style={{backgroundColor: '#fff'}} className="mt-3 pt-3 pb-3 ">
                {renderTabs}
                </div> 
           </div>
        </div>
    )
}

export default Tabs
