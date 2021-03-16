import {fetchRequest} from "../fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";

const vsprintf = require("sprintf-js").vsprintf;

export const buildRequestUrl = ({endpoint = "", operation = "", args = []}) => {
    if (args.length > 0) {
        endpoint = vsprintf(endpoint, args)
    }
    return `${endpoint}/${operation}`;
}

export const fetchProvider = ({callback, providerId}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.provider,
        operation: providerId,
        onSuccess: callback
    })
}

export const fetchServiceRequest = ({callback, providerId, serviceRequestId}) => {
    fetchRequest({
        endpoint: sprintf(ApiConfig.endpoints.serviceRequest, providerId),
        operation: serviceRequestId,
        onSuccess: callback
    })
}

