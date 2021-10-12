// get total page counts from the data
export const getPageCount = (perPage) => {
    return parseInt(perPage) !== 'NaN' 
        && parseInt(perPage) <= 10 ? parseInt(perPage) : 10;
}
// get number of pages for pagination
export const getPages = (len, count) => Math.ceil(len / (count));

// next
export const goTo = (id, set) => set(id);

// set page
export const onSetPage  = async (page, key, set) => {
    let p = parseInt(page) === 'NaN' ?  parseInt(page) : 1;
    if (key === 'prev') {
        p = p < 1 ? 1 : p;
    }

    if (key === 'next') {
        p = p + 1;
    }
    set(p)
    return p;
}