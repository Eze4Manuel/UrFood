import React, { useEffect, useState } from 'react';

import config from '../../../assets/utils/config';
import ListingFoodDetail from './ListingFoodDetail';
import EditFoodListingForm from './EditFoodListingForm';
import Spinner from 'react-loader-spinner';
import { ContainerLoader } from '../../../components/loading/Loading';
import { Dialog } from 'primereact/dialog';


const ListingFoodUpdate = ({ data, show, onHide, onDeleted }) => {
    const [values, setValues] = React.useState(config.userData);
    const [showPartner, setShowPartner] = React.useState(true);
    const [, setShowProfile] = React.useState(false);
    const [, setShowPassword] = React.useState(false);
    const [, setDelWarning] = React.useState(false);
    const [loader,] = useState(false);
    const [loading,] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPartner = () => {
        setShowPartner(true)
        setShowPassword(false)
        setShowProfile(false)
    }

    const onCancelProfileEdit = () => {
        setShowPassword(false)
        setShowProfile(false)
        setShowPartner(true)
    }



    return (
        <Dialog closeOnEscape header={'Listed Food'} visible={show} modal onHide={() => onHide()} style={{ width: "70vw" }}>
            {loader ? <ContainerLoader /> : null}
            <div className="partner-info__ctn">
                <div className="partner-info__btn-action-wp">
                    <div className="partner-info__btn-action">
                        <button onClick={() => onEditPartner()} className="btn btn__edit-ctn btn-action__green">Update Food</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7 mt-5">
                        <div className="partner-form__button-wp">
                            {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
                        </div>
                        <ListingFoodDetail data={values} />
                    </div>
                    <div className="col-5">
                        <EditFoodListingForm onUpdated={(data) => setValues(data)} onHide={() => onCancelProfileEdit()} data={values} show={showPartner} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ListingFoodUpdate;