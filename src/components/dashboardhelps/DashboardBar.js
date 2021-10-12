import React from 'react';

const DashboardBar = ({ 
    Bar, 
    data, 
    dataKey,
    header,
    icon,
    iconDesc,
    desc,
    total,
    col
}) => {
    return (
        <div className={`col-${col || 6} mt-4`}>
            <div className="shadow-sm card border-light">
                <div className="d-flex flex-row align-items-center flex-0 border-bottom card-body">
                    <div className="d-block">
                        <h5>{header}</h5>
                        <div className="small mt-2 mb-3">
                            <span><i class={`${icon || "las la-book-open"}`}></i> {iconDesc}</span>
                        </div>
                        <div className="d-flex">
                            <div className="d-flex align-items-center mr-3 pc-line">
                                <span class="shape-xs rounded-circle bg-secondary mr-2"></span>
                                <small class="fw-normal">{desc}</small>
                            </div>
                        </div>
                        <div className="p-2 card-body">
                            <Bar data={data} barValue={dataKey}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardBar
