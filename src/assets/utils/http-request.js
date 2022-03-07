import axios from "axios";

const ENV = 'local'

const getURL = (env) => {
    
    if (env === 'local') {
        return 'http://localhost:9096/v1'
    }
    
    if (env === 'staging') {
        return 'https://urfood.appbuildtest.com/v1'
    }

    return 'https://api.urfood.com/v1'
}

const uri = getURL(ENV)

const Axios = axios.create({ baseURL: uri });

export default Axios;

