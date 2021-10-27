import request from '../../../assets/utils/http-request';
import helpers from '../../../core/func/Helpers';

const lib = {}



lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/foods/admin?page=${page}&q=${search}`;
        } else {
            uri = `/foods/admin?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}
 

lib.updateFood = async (values, id, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        uri = `foods/admin/${id}`;
        return await (await request.put(uri, values, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
} 

lib.create = async (values, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.post('/foods/admin', values, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.delete = async (id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.delete(`/foods/admin/${id}`, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;