import request from '../../../assets/utils/http-request';
import helpers from '../../../core/func/Helpers';

const lib = {}


lib.get = async (page, search, token) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        if (search) {
            uri = `/orders/admin/?page=${page}&q=${search}`;
        } else {
            uri = `/orders/admin/?page=${page}`;
        }
        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.getDispatchers = async (token, user_type) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        uri = `auth/admin?user_type=${user_type}`;
        return await (await request.get(uri, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



lib.updateDispatcher = async (token, order_id, dispatcher_id) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        uri = `orders/admin/assign-dispatcher`;

        return await (await request.put(uri, { order_id, dispatcher_id }, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.updateStauts = async (token, auth_id, state) => {
    let uri = '';
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        uri = `/orders/admin/update-order-status/${auth_id}`;
        return await (await request.put(uri, { order_status: state }, cfg)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.registerApp = async (token, phone_number) => {
    let uri = `/notifications/web-subscription`;     
    try {

        let cfg = helpers.getHeaderAccessControl()
        return await (await request.post(uri, {token, phone_number}, cfg )).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



lib.create = async (values, setLoading, setError, setValues, valuesInitialState) => {
    // check the form data

    // send create request

    // add to the list of user
    // () => (values, setLoading, setError, setValues)
}

lib.delete = async (userID, setLoading, setError, onHide, onDeleted) => {

    // delete user
    // hide the modal 
    onHide()
    // remove the deleted data
    onDeleted(userID)
}

export default lib;