import React from 'react';
import './Style.css';
import { useHistory } from 'react-router-dom';
import Pagination from '../widgets/Pagination';

const navigateTo = (route, id, history) => {
    if (typeof history.push === 'function') {
        history.push(`${route}/${id}`);
    }
}

const Table = (props = {
    tableHeader: null,
    data: [],
    dataFields: [],
    tableTitle: '',
    onSelectData: null,
    route: null,
    pages: 0,
    goTo: null,
    next: null,
    prev: null,
    activePage: 0,
    rightSide: null,
    sideTitle: null
}) => {
    const history = useHistory();
    const tableHeader = props.tableHeader.map(_th => (<th scope="col">{_th}</th>))
    const tableRow = props.data?.map((_tr, _idx) => {
        return (
            <tr
                className="table-effect"
                onClick={() => typeof props.onSelectData === 'function'
                    ? props.onSelectData(_tr)
                    : navigateTo(props.route, _tr?.id, history)
                }
            >
                <th scope="row">
                    {_idx + 1}
                </th>
                {
                    props.dataFields.map((key) => {
                        let dk = key;
                        let value
                        // if (key === 'username') {
                        //     dk = 'email'
                        // }
                        value = _tr[dk]
                        // nested object
                        // let nestedKey = key.split('.');
                        // if (nestedKey?.length > 1 && nestedKey[1] !== 'length') {
                        //     value = _tr[nestedKey[0]][nestedKey[1]]
                        // }
                        // // array length
                        // if (nestedKey?.length > 1 && nestedKey[1] === 'length') {
                        //     value = _tr[nestedKey[0]]?.length
                        // }
                        return (<td>{value}</td>)

                        // return (<td>{_tr[dk]}</td> )
                    })
                }
            </tr>
        )
    })

    return (
        <div className="px-5 pt-5 table-responsive table-height card mt-4 overflow-scroll">
            <span className='table table-header-container'>
                <h1>{props.tableTitle}</h1>
                <div>
                    <h6> {props.sideTitle}</h6>                    
                    <span>{props.rightSide}</span>
                </div>
            </span>
            <table className="table table-hover table-sm"  ref={props.ref}>
                <thead>
                    <tr className="app-table__header">{tableHeader}</tr>
                </thead>
                <tbody >
                    {tableRow}
                </tbody>
            </table>
            <Pagination {...props} />
        </div>
    )
}

export default Table;
