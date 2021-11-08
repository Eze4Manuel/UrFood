import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}



lib.get = async (page, search, token, auth_id, user_type) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/orders?page=${page}&q=${search}`;
        } else {
            uri = `/orders?page=${page}&auth_id=${auth_id}&user_type=${user_type}`;
        }
        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.getUsers = async (token, component) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))

        uri = `/auth/admin?component=${component}`;

        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.getTransactionsSummary = async (token, component, year) => {
    let uri = ''
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))

        uri = `/transactions?component=${component}&year=${year}`;

        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.getOrderSummary = async (token, component, year) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        uri = `/orders/admin?component=${component}&year=${year}`;
        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



export default lib;