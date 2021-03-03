import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import Admin from "../../../../../../../views/layouts/Admin";
import {fetchData} from "../../../../../../../library/api/fetcher-api/fetcher-middleware";
import {isObjectEmpty, isSet} from "../../../../../../../library/utils";
import ApiClient from "../../../../../../../views/components/ApiTools/ApiClient";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {ServiceRequestParametersPageName} from "../parameters";

const sprintf = require("sprintf-js").sprintf

export const ServiceRequestTestPageName = "request_test";

const ServiceRequestTest = (props) => {

    const [provider, setProvider] = useState({});
    const [serviceRequest, setServiceRequest] = useState({});

    useEffect(() => {
        if (!isObjectEmpty(provider.data) && !isObjectEmpty(serviceRequest.data)) {
            setBreadcrumbsPageNameAction(ServiceRequestTestPageName)
            setBreadcrumbsDataAction({
                provider: {
                    id: provider.id,
                    name: provider.provider_name
                },
                service_requests: {
                    id: serviceRequest.id,
                    name: serviceRequest.service_request_name
                },
            })
        }
    }, [provider, serviceRequest]);

    useEffect(() => {
        if (isSet(props.provider_id) && isSet(props.service_request_id)) {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id)).then((response) => {
                setProvider(provider => {
                    return {...provider, ...response.data.data}
                })
            })
            fetchData(sprintf(ApiConfig.endpoints.serviceRequest, props.service_request_id)).then((response) => {
                setServiceRequest(serviceRequest => {
                    return {...serviceRequest, ...response.data.data}
                })
            })
        }
    }, [props.provider_id, props.service_request_id]);

    return (
        <>
            {!isObjectEmpty(provider) && !isObjectEmpty(serviceRequest) &&
            <Admin pageName={ServiceRequestTestPageName}>
                <ApiClient
                    provider={provider}
                    serviceRequest={serviceRequest}
                />
            </Admin>
            }
        </>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            provider_id: params.provider_id,
            service_request_id: params.service_request_id
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ServiceRequestTest;