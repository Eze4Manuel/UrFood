import React, { useEffect, useState } from 'react';
import './ListingUserData.css';
import { Dialog } from 'primereact/dialog';
import config from '../../../assets/utils/config';
import ListingUserDetail from './ListingUserDetail';
import Spinner from 'react-loader-spinner';
import { ContainerLoader } from '../../../components/loading/Loading';


const ListingUserData = ({ data, show, onHide, onDeleted }) => {
    const [values, setValues] = React.useState(config.userData);
    const [, setDelWarning] = React.useState(false);
    const [loader, ] = useState(false);
    const [loading, ] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    return (
        <Dialog closeOnEscape header={'Listed Food'} visible={show} modal onHide={() => onHide()} style={{ width: "50vw" }}>
            {loader ? <ContainerLoader /> : null}
            <div className="partner-info__ctn">
                <div className="row">
                    <div className="col-12 mt-0">
                        <div className="partner-form__button-wp">
                            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                        </div>
                        <ListingUserDetail data={values} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ListingUserData
