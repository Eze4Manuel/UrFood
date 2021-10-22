import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}
 

lib.updateSettingsPassword = async (id, data, token) => {
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        
        return await (await request.put(`/auth/update-user-password`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;