import React from 'react';
import { Dialog } from 'primereact/dialog';

/**
 * 
 * variant option (warning, danger)
 * @param {{
 * title: string;
 * message: string;
 * show: false;
 * onCancel: Function;
 * onProceed: Function;
 * variant: string;
 * }} param 
 * @returns 
 */
const Flash = ({ title, message, show, onCancel, onProceed, variant='warning'}) => (
    <Dialog visible={show} onHide={() => onCancel()}>
        <div style={{ minWidth: '350px'}}>
            <h3>{ title || 'Notification!'}</h3>
            <p style={{ fontSize: '0.8rem',color: variant === 'warning' ? 'red' : 'black'}}>{message}</p>
            <div className="password-update__btn-ctn">
                <button onClick={() => onCancel()} style={{width: 100, height: 30}} class="p-button p-component p-button-outlined p-button-secondary"><span class="p-button-label p-c">Cancel</span></button>
                <button onClick={() => typeof onProceed === 'function' ? onProceed() : () => {}} style={{width: 100, height: 30}} class="p-button p-component p-button-raised p-button-success"><span class="p-button-label p-c">Ok</span></button>
            </div> 
        </div>
    </Dialog>
)

export default Flash