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
 * variant: string;
 * }} param 
 * @returns 
 */
const Alert = ({ title, message, show, onCancel, variant='warning'}) => (
    <Dialog visible={show} onHide={() => onCancel()}>
        <div style={{ minWidth: '350px'}}>
            <h3>{ title || 'Notification!'}</h3>
            <p style={{ fontSize: '0.9rem',color: variant === 'warning' ? 'red' : 'black'}}>{message}</p>
        </div>
    </Dialog>
)

export default Alert