import {isNumber} from './validator';

export const trimText = (text, len = 30) => {
    if (typeof text !== 'string') return '';
    return text.length > len 
        ? text.substr(0, len)+"..."
        : text
}

// Query string
export const Qs = (obj) => {
    if(!obj) return "";
    let qs = "";
    Object.keys(obj).map((key, i) => {
        if (i===0) {
            qs += `?${key}=${obj[key]}`;
        } else {
            qs += `&${key}=${obj[key]}`;
        }
        return key;
    });
    return qs;
}

export const toGMT = (date, day=true) => {
    if (!date) return "";
    const start = day ? 0 : 1;
    return new Date(date)
        .toGMTString()
        .split(" ")
        .slice(start,4)
        .join(" ")
}

export const toNumber = (value) => {
    if (!isNumber(value)) return '0.00';
    let snum = String(value).split('.');
    let val = snum.length === 2 ?  '.'+snum[1]: '.00';
    return snum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+val;
}

export const toValue = (value) => {
    if (!isNumber(value)) return '0';
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const toCurrency = (amount, currency = 'NGN') => {
    switch (currency) {
        case 'NGN':
            return '₦'+toNumber(amount)
        case 'USD':
            return '$'+toNumber(amount)
        case 'GHS': // Ghana Cedi
            return 'GH₵'+toNumber(amount)
        case 'CFA': // West African Franc
            return 'CFA'+toNumber(amount)
            //  ₣ 
        default:
            return '₦'+toNumber(amount);
    }
}