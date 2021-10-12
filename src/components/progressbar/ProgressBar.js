import React, { Fragment } from 'react';
import './ProgressBar.css';
import { toNumber } from '../../core/func/format'

const ProgressBar = ({ data, barValue, format=false ,width='200px' }) => {
    let total = data?.map(v => v[barValue]).reduce((t,c) => t+c)
    let pb = data?.map((n,idx)=> {
        let barColor = ['bg-success', 'bg-info', 'bg-warning', 'bg-secondary','bg-primary','bg-warning']
        let per = ((n[barValue]*100)/total).toFixed(2)+"%"
        let val = format ? toNumber(n[barValue]) : n[barValue]
        return (
            <div className="d-flex align-items-center row">
                <div className="col-4 pr-1" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 14}}>
                    <span style={{fontWeight: 'bold'}} className="small">{val}</span>
                </div>
                <div className="col-7 ml-1">
                    <div class="progress my-2 progress-bar__size" style={{width}}>
                        <div className={`progress-bar ${barColor[idx]}`} role="progressbar" style={{width: per}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <Fragment>
            {pb}
        </Fragment>
    )
}

export default ProgressBar
