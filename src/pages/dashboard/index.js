import React, { useState } from 'react';
import './Dashboard.css';
import NavigationBar from '../../components/navigation/Navbar';
import { ContainerLoader } from '../../components/loading/Loading';



const Dashboard = (props) => {

    const [loader, ] = useState(false);
    

    return (
        <div className='main-content'>
            {loader ? <ContainerLoader /> : null}
            <NavigationBar {...props} />
            <main>
                <div className="container dashboard-table__container">
                    <div className="product-summary__ctn mt-5">
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;