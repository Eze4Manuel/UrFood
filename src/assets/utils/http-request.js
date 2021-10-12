import axios from "axios";

// const uri = 'http://localhost:9005/v1' // local
const uri = 'https://urfood.appbuildtest.com/v1' // staging
// const uri = 'https://api.urfood.com/v1' // live
const Axios = axios.create({baseURL: uri});
export default Axios;

