import request from '../../assets/utils/http-request';
import helpers from '../../core/func/Helpers';

const lib = {}
 

lib.updateSettingsPassword = async (id, data, token) => {
    console.log(data);
    try {
        let cfg = helpers.getHeaderConfig(String(token).substr(7))
        
        return await (await request.post(`/auth/admin-password-reset`, data, cfg)).data 
    } catch (e) {
        return {status: 'error', msg: e?.response?.data?.msg || e?.message}
    }
}

export default lib;