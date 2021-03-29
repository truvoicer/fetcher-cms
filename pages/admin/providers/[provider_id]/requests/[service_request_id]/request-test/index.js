import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../../../../views/layouts/SidebarLayout";
import {isNotEmpty, isSet} from "../../../../../../../library/utils";
import ApiClient from "../../../../../../../views/components/ApiTools/ApiClient";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../../../library/redux/actions/breadcrumbs-actions";
import {fetchProvider, fetchServiceRequest} from "../../../../../../../library/api/helpers/api-helpers";

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
            fetchProvider({
                providerId: props.provider_id,
                callback: (responseData) => {
                    setProvider(provider => {
                        return {...provider, ...responseData.data}
                    })
                }
            })
            fetchServiceRequest({
                providerId: props.provider_id,
                serviceRequestId: props.service_request_id,
                callback: (responseData) => {
                    setServiceRequest(serviceRequest => {
                        return {...serviceRequest, ...responseData.data}
                    })
                }
            })
        }
    }, [props.provider_id, props.service_request_id]);

    return (
        <>
            <SidebarLayout pageName={ServiceRequestTestPageName}>
                {isNotEmpty(provider) && isNotEmpty(serviceRequest) &&
                <ApiClient
                    provider={provider}
                    serviceRequest={serviceRequest}
                />
                }
            </SidebarLayout>
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