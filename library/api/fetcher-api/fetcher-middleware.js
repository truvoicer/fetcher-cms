import apiConfig from "../../../config/api-config";
import {getSessionObject} from "../../session/authenticate";
import {isObjectEmpty} from "../../utils";
import {buildRequestUrl} from "../helpers/api-helpers";

const sprintf = require("sprintf-js").sprintf;
const axios = require("axios");

const fetcherApiRequest = axios.create({
    baseURL: apiConfig.apiUrl,
});

export const getApiUser = async () => {
    const requestData = {
        method: "post",
        url: apiConfig.endpoints.getApiUser,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    return await fetcherApiRequest.request(requestData);
}

export const getToken = async (data) => {
    return axios.post(process.env.NEXT_PUBLIC_API_URL + apiConfig.endpoints.login, data);
}

export const fetchRequest = ({endpoint, operation = "", args = [], data={}, onSuccess, onError}) => {
    const request = {
        method: "get",
        url: buildRequestUrl({endpoint: endpoint, operation: operation, args: args}),
        params: data,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    fetcherApiRequest.request(request).then(response => {
        onSuccess(response.data)
    }).catch(error => {
        onError(error)
    });
}

export const postRequest = ({endpoint, operation, requestData, args = [], method = "post", onSuccess, onError}) => {
    const request = {
        method: method,
        url: buildRequestUrl({endpoint: endpoint, operation: operation, args: args}),
        data: requestData,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    fetcherApiRequest.request(request).then(response => {
        onSuccess(response.data)
    }).catch(error => {
        onError(error)
    });
}

export const sendData = async (operation, endpoint, data) => {
    const requestData = {
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL + sprintf(apiConfig.endpoints[operation], endpoint),
        data: data,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    return await fetcherApiRequest.request(requestData);
}

export const sendFileData = async (operation, endpoint, data) => {
    const requestData = {
        method: "post",
        url: process.env.NEXT_PUBLIC_API_URL + sprintf(apiConfig.endpoints[operation], endpoint),
        data: data,
        headers: {
            'Authorization': sprintf("Bearer %s", getSessionObject().access_token),
            "Content-Type": "multipart/form-data"
        }
    }
    return await fetcherApiRequest.request(requestData);
}

export const fetchData = async (endpoint, queryObj) => {
    const requestData = {
        method: "get",
        url: process.env.NEXT_PUBLIC_API_URL + endpoint,
        params: queryObj,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    return await fetcherApiRequest.request(requestData);
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

const buildHttpQuery = (queryObject = {}) => {
    let esc = encodeURIComponent;
    if (isObjectEmpty(queryObject)) {
        return {};
    }
    return "?" + Object.keys(queryObject)
        .map(k => esc(k) + '=' + esc(queryObject[k]))
        .join('&');
}