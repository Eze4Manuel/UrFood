export const isNumber = (val) => {
    return typeof val === 'number' 
        && String(Number(val)) !== 'NaN'
        && val !== '' 
}

