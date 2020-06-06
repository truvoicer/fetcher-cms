import axios from 'axios';
import apiConfig from "../../config/api-config";
import {getSessionObject} from "../session/authenticate";
const sprintf = require("sprintf-js").sprintf;

export const sendData = async (operation, endpoint, data) => {
    data.access_token = getSessionObject().access_token;
    // console.log(apiConfig.endpoints[operation])
    return await axios.post(apiConfig.apiUrl + sprintf(apiConfig.endpoints[operation], endpoint), data);
}

export const fetchData = async (endpoint, queryObj) => {
        let apiUrl = apiConfig.apiUrl + endpoint + buildHttpQuery(queryObj);
        return await axios.get(apiUrl);
}

export const responseHandler = (promise, callback) => {
    promise.then((response) => {
        if (response.status === 200) {
           callback(response.status, response.data.message, response.data);
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.response) {
            callback(error.response.status, error.response.data.message);
        }
    });
}

const buildHttpQuery = (queryObject = false) => {
    if (!queryObject) {
        queryObject = {
            access_token: getSessionObject().access_token
        }
    } else {
        queryObject.access_token = getSessionObject().access_token;
    }

    // console.log(queryObject);
    let esc = encodeURIComponent;
    return "?" + Object.keys(queryObject)
        .map(k => esc(k) + '=' + esc(queryObject[k]))
        .join('&');
}