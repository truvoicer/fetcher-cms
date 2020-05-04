import axios from 'axios';
import apiConfig from "../../config/api";

export const sendData = async (endpoint, data) => {
    try {
        return responseHandler(await axios.post(apiConfig.apiUrl + endpoint, data));
    } catch (e) {
        console.error(e)
        return false;
    }
}

export const fetchData = async (endpoint, queryObj) => {
    try {
        return responseHandler(await axios.get(apiConfig.apiUrl + endpoint + buildHttpQuery(queryObj)));
    } catch (e) {
        console.error(e)
        return false;
    }
}

const responseHandler = (response) => {
    switch (response.status) {
        case 200:
            return response;
        case 400:
        default:
            console.error(response)
            return false;
    }
}

const buildHttpQuery = (queryObject) => {
    let esc = encodeURIComponent;
    return  Object.keys(queryObject)
        .map(k => esc(k) + '=' + esc(queryObject[k]))
        .join('&');
}