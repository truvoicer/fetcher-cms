import {ScraperApiConfig} from "../../../config/scraper-api-config";
import {getSessionObject, setScraperApiSession} from "../../session/authenticate";
import apiConfig from "../../../config/api-config";
import {isNotEmpty, isSet} from "../../utils";
import {buildRequestUrl} from "../helpers/api-helpers";

const axios = require("axios");
const sprintf = require("sprintf-js").sprintf;

const scraperApiRequest = axios.create({
    baseURL: ScraperApiConfig.apiUrl,
});


export const getScraperApiUser = async () => {
    const requestData = {
        method: "post",
        url: ScraperApiConfig.endpoints.getApiUser,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().scraper_token)}
    }
    return await scraperApiRequest.request(requestData);
}


const authResponseHandler = ({onSuccess, onError, request}) => {
    request.then(response => {
        if (onSuccess) {
            onSuccess(response.data)
        }
    }).catch(error => {
        switch (error?.response?.data?.status) {
            case "error":
                console.error(error?.response?.data?.message)
                break;
            default:
                console.error(error)
                break;
        }
        if (onError) {
            onError(error?.response?.data || error)
        }
    });
}

export const sessionTokenCheck = ({onSuccess = false, onError = false, endpoint}) => {
    const requestData = {
        method: "post",
        url: ScraperApiConfig.endpoints.tokenCheck,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().scraper_token)}
    }
    authResponseHandler({
        request: scraperApiRequest.request(requestData),
        onSuccess: onSuccess,
        onError: onError
    })
}

export const scraperTokenRequest = ({onSuccess = false, onError = false, endpoint}) => {
    const requestData = {
        method: "post",
        url: endpoint,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().access_token)}
    }
    authResponseHandler({
        request: axios.request(requestData),
        onSuccess: onSuccess,
        onError: onError
    })
}

export const scraperTokenCheck = ({onSuccess, onError}) => {
    const scraperToken = getSessionObject().scraper_token;
    if (isNotEmpty(scraperToken)) {
        sessionTokenCheck({
            onSuccess: onSuccess,
            onError: onError
        })

    } else {
        scraperTokenRequest({
            endpoint: ScraperApiConfig.apiUrl + ScraperApiConfig.endpoints.webTokenCheck,
            onSuccess: onSuccess,
            onError: onError
        })
    }
}
export const getScraperToken = ({onSuccess, onError}) => {
    scraperTokenRequest({
        endpoint: ScraperApiConfig.apiUrl + ScraperApiConfig.endpoints.login,
        onSuccess: onSuccess,
        onError: onError
    })
}

export const scraperFetchRequest = ({endpoint, operation = "", args = [], data={}, onSuccess, onError}) => {
    const request = {
        method: "get",
        url: buildRequestUrl({endpoint: endpoint, operation: operation, args: args}),
        params: data,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().scraper_token)}
    }
    scraperApiRequest.request(request).then(response => {
        onSuccess(response.data)
    }).catch(error => {
        onError(error)
    });
}

export const scraperPostRequest = ({endpoint, operation, requestData, args = [], method = "post", onSuccess, onError}) => {
    const request = {
        method: method,
        url: buildRequestUrl({endpoint: endpoint, operation: operation, args: args}),
        data: requestData,
        headers: {'Authorization': sprintf("Bearer %s", getSessionObject().scraper_token)}
    }
    scraperApiRequest.request(request).then(response => {
        onSuccess(response.data)
    }).catch(error => {
        onError(error)
    });
}