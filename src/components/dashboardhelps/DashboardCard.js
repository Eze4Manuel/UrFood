import React from 'react'

const DashboardCard = ({ col, header, value, desc, color='black'}) => {
    let valCol = {
        'blue': 'text-primary',
        'green': 'text-success',
        'red': 'text-danger',
        'yellow': 'text-warning',
        'black': 'text-dark',
        'grey': 'text-secondary',
        'azure': 'text-info',
        'white': 'text-light'
    }[color]
    return (
        <div className={`col-${col || 12}`}>
            <div className="m-2">
                <div className="card p-2 pl-3">
                        <h5><span>{header}</span></h5>
                        <h2><span className={`${valCol}`}>{value}</span></h2>
                        <p className="small"><span>{desc}</span></p>
                </div>
            </div>
        </div> 
    )
}

export default DashboardCard
