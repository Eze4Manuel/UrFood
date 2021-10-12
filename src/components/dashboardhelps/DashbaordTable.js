import React from 'react'

const DashbaordTable = ({
    header,
    col,
    headerRow,
    dataRow,
    data,
    order
}) => {
    let dataHeader = order ? [<td>#</td>].concat(headerRow.map(d => <td>{d}</td>)) : headerRow.map(d => <td>{d}</td>)
    let tableData = data.map((value, idx) => {
        let dt = order ? [<td>{idx+1}</td>] : []
        dt = dt.concat(dataRow.map(key => (<td>{value[key]}</td>)))
        return (
            <tr className="small">{dt}</tr>
        )
    })
    return (
        <div className={`col-${col || 6}`}>
            <div>
                <div className="px-5 pt-3 table-responsive table-height card mt-4 overflow-scroll">
                <h6>{header}</h6>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr className="small fw-bold">
                            {dataHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    )
}

export default DashbaordTable
