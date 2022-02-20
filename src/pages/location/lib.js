import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}
 
lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/locations?&page=${page}&q=${search}`;
        } else {
            uri = `/locations?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.getOne = async (id, token) => {
    let uri = `/locations/${id}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.getOneArea = async (id, token) => {
    let uri = `/locations/get-area/${id}`;
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.get(uri, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.createLocation = async (values, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.post('/locations', values, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


lib.createArea = async (values, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.post('/locations/create-area', values, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}
 
lib.updateLocation = async (id, data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.put(`/locations/${id}`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.updateArea = async (id, data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.put(`/locations/update-area/${id}`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

lib.deleteLocation = async (id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.delete(`/locations/${id}`, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}


lib.deleteArea = async (id, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        return await (await request.delete(`/locations/delete-area/${id}`, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;