import React from 'react';

const getPageItems = (pages, goTo) => (
    new Array(pages)
        .fill('')
        .map((item, idx) => (
            <li onClick={() => typeof goTo === 'function' ? goTo(idx+1) : {}} key={item+idx} className="page-item">
                <a className="page-link text-success" href="#/">{idx+1}</a>
            </li>
        ))
)

const Paginate = (props) => (
    <li onClick={() => typeof props?.func === 'function' ? props?.func() : {}} 
        className={`page-item ${props.disable ? 'disabled' : ''}`}>
        <a className="page-link text-success" href="#/" aria-label={props.ariaLabel}>
            {
                props.label === 'prev' 
                ? <span aria-hidden="true">&laquo;</span>
                : <span aria-hidden="true">&raquo;</span>
            }
        </a>
    </li>
)

/**
 * Table pagination 
 * 
 * @param {{
 *  pages: number;
 *  goTo: Function;
 *  next: Function;
 *  prev: Function;
 *  activePage: number;
 *  data: Array
 * }} props 
 * @returns 
 */
const Pagination = (props) => {
    const pageItems = getPageItems(props.pages, props.goTo);
    return (
        <div className="mt-5" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <Paginate 
                        disable={props.activePage === 1 ? true : false}
                        func={props.prev} 
                        ariaLabel="Previous" 
                        label="prev" 
                    />
                    {pageItems}
                    <Paginate 
                        disable={props.data?.length < 10 ? true : false}
                        func={props.next} 
                        ariaLabel="Next" 
                        label="next" 
                    />
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
