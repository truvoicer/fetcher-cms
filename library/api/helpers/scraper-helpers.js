import {fetchRequest, postRequest} from "../fetcher-api/fetcher-middleware";
import ApiConfig from "../../../config/api-config";

export const getScraperList = ({providerId, onSuccess, onError}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: "list",
        data: {
            provider_id: providerId,
            count: 1000,
            order: "asc",
            sort: "scraperName"
        },
        onSuccess: (responseData) => {
            onSuccess(responseData.data)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

export const getScraperById = ({scraperId, onSuccess}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `${scraperId}`,
        onSuccess: onSuccess,
    })
}
export const getScraperSchedule = ({scraperId: scraperScheduleId, onSuccess, onError}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `schedule/${scraperScheduleId}`,
        onSuccess: (responseData) => {
            onSuccess(responseData.data)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

export const getScraperScheduleByScraperId = ({scraperId, onSuccess, onError}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `${scraperId}/schedule`,
        onSuccess: (responseData) => {
            onSuccess(responseData)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

export const getScraperConfig = ({scraperConfigId, onSuccess, onError}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `config/${scraperConfigId}/single`,
        onSuccess: (responseData) => {
            onSuccess(responseData.data)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

export const getScraperConfigByScraperId = ({scraperId, onSuccess, onError}) => {
    fetchRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `${scraperId}/config`,
        onSuccess: (responseData) => {
            onSuccess(responseData)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

export const sendScraperJobRequest = ({scraperId, onSuccess, onError}) => {
    postRequest({
        endpoint: ApiConfig.endpoints.scraper,
        operation: `${scraperId}/job/send`,
        onSuccess: (responseData) => {
            onSuccess(responseData)
        },
        onError: (error) => {
            onError(error)
        },
    })
}