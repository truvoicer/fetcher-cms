import apiConfig from "../../../config/api-config";
import {getSessionObject} from "../../session/authenticate";
import {isObjectEmpty, isSet} from "../../utils";
import {buildRequestUrl} from "../helpers/api-helpers";
import {setErrorAlertAction} from "../../redux/actions/global-actions";

const sprintf = require("sprintf-js").sprintf;
const axios = require("axios");

const fetcherApiRequest = axios.create({
    baseURL: apiConfig.apiUrl,
});

export const getApiUser = async () => {
    const requestData = {
        method: "post",
        url: `${apiConfig.endpoints.auth}/token/user`,
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
    responseHandler({
        promise: fetcherApiRequest.request(request),
        onError: onError,
        onSuccess: onSuccess
    })
}

export const postRequest = ({endpoint, operation, requestData, args = [], method = "post", onSuccess, onError}) => {
    const request = {
        method: method,
        url: buildRequestUrl({endpoint: endpoint, operation: operation, args: args}),
        data: requestData,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    responseHandler({
        promise: fetcherApiRequest.request(request),
        onError: onError,
        onSuccess: onSuccess
    })
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


export const responseHandler = ({promise, onSuccess, onError}) => {
    promise.then(response => {
        onSuccess(response.data)
    }).catch(error => {
        if (isSet(onError)) {
            onError(error)
        } else {
            setErrorAlertAction({
                text: error?.response?.data?.message || error?.response?.message || "Error"
            })
        }
        console.error(error)
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