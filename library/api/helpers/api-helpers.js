import {fetchRequest} from "../fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";
import {isSet, uCaseFirst} from "../../utils";

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
export const buildCategoriesSelectOptions = (data) => {
    return data.map((item, index) => {
        return {
            value: item.id,
            label: item.category_label
        }
    })
}


export const buildServiceRequestSelectOptions = (requests) => {
    return requests.map((item, index) => {
        return {
            value: item.id,
            label: item.service_request_label
        }
    })
}

export const buildServicesSelectOptions = (requests) => {
    return requests.map((item, index) => {
        return {
            value: item.id,
            label: item.service_label
        }
    })
}

export const buildResponseKeyReturnDataType = (data) => {
    if (isSet(data) && data !== "" && data !== null && data !== false) {
        return {
            value: data,
            label: uCaseFirst(data)
        }
    }
    return null;
}

export const buildFormListSelectedValueType = (value_type) => {
    if (isSet(value_type) && value_type !== "") {
        return {
            value: value_type,
            label: uCaseFirst(value_type)
        }
    }
}

export const formListSelectedValueType = [
    {
        label: "Text",
        value: "text"
    },
    {
        label: "List",
        value: "list"
    }
];

export const textTypesOptions = [
    {
        label: "Text",
        value: "text"
    },
    {
        label: "Textarea",
        value: "textarea"
    }
];