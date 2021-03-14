import ApiConfig from "../../../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../../../../views/layouts/SidebarLayout";
import {fetchData, fetchRequest} from "../../../../../../../library/api/fetcher-api/fetcher-middleware";
import {isNotEmpty, isObjectEmpty, isSet} from "../../../../../../../library/utils";
import ApiClient from "../../../../../../../views/components/ApiTools/ApiClient";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {ServiceRequestParametersPageName} from "../parameters";

const sprintf = require("sprintf-js").sprintf

export const ServiceRequestTestPageName = "request_test";

const ServiceRequestTest = (props) => {

    const [provider, setProvider] = useState(null);
    const [serviceRequest, setServiceRequest] = useState(null);

    useEffect(() => {
        if (isNotEmpty(provider) && isNotEmpty(serviceRequest)) {
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
            fetchRequest({
                endpoint: ApiConfig.endpoints.provider,
                operation: `${props.provider_id}`,
                onSuccess: (responseData) => {
                    setProvider(provider => {
                        return {...provider, ...responseData.data}
                    })
                }
            })
            fetchRequest({
                endpoint: ApiConfig.endpoints.serviceRequest,
                operation: `${props.service_request_id}`,
                onSuccess: (responseData) => {
                    setServiceRequest(serviceRequest => {
                        return {...serviceRequest, ...responseData.data}
                    })
                }
            })
        }
    }, [props.provider_id, props.service_request_id]);

    return (
        <>
            {isNotEmpty(provider) && isNotEmpty(serviceRequest) &&
            <SidebarLayout pageName={ServiceRequestTestPageName}>
                <ApiClient
                    provider={provider}
                    serviceRequest={serviceRequest}
                />
            </SidebarLayout>
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