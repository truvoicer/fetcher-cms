import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../../views/layouts/SidebarLayout";
import ProviderRequestsTable from "../../../../../views/components/Tables/ProviderRequestsTable";
import Col from "react-bootstrap/Col";
import {fetchRequest} from "../../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../../config/api-config";
import {getRouteItem} from "../../../../../library/session/authenticate";
import {Routes} from "../../../../../config/routes";
import {isObjectEmpty, isSet} from "../../../../../library/utils";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../library/redux/actions/breadcrumbs-actions";

const sprintf = require("sprintf-js").sprintf

export const ProviderRequestsPageName = "service_requests";

const ProviderRequests = (props) => {

    const [showTable, setShowTable] = useState(false);
    const [provider, setProvider] = useState({});

    useEffect(() => {
        if (!isObjectEmpty(provider)) {
            setBreadcrumbsPageNameAction(ProviderRequestsPageName)
            setBreadcrumbsDataAction({
                provider: {
                    id: provider.id,
                    name: provider.provider_name
                }
            })
        }
    }, [provider]);
    useEffect(() => {
        if (isSet(props.provider_id)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.provider,
                operation: `${props.provider_id}`,
                onSuccess: (responseData) => {
                    setProvider(responseData.data)
                    setShowTable(true)
                }
            })
        }
    }, [props.provider_id])

    const getBaseUrl = () => {
        return getRouteItem(Routes.items, ProviderRequestsPageName).route;
    }

    return (
        <SidebarLayout pageName={ProviderRequestsPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                {showTable &&
                <ProviderRequestsTable provider_id={provider.id} baseUrl={getBaseUrl()}/>
                }
                </Col>
            </>
        </SidebarLayout>
    )
}

export async function getStaticProps({params}) {
    return {
        props: {
            provider_id: params.provider_id
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export default ProviderRequests;
