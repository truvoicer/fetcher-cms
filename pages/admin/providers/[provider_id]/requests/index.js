import React, {useEffect, useState} from "react";
import Admin from "../../../../../views/layouts/Admin";
import ProviderRequestsTable from "../../../../../views/components/Tables/ProviderRequestsTable";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../../config/api-config";
import {getRouteItem} from "../../../../../library/session/authenticate";
import {Routes} from "../../../../../config/routes";
import {isSet} from "../../../../../library/utils";

const sprintf = require("sprintf-js").sprintf

export const ProviderRequestsPageName = "service_requests";

const ProviderRequests = (props) => {

    const [showTable, setShowTable] = useState(false);
    const [provider, setProvider] = useState({});

    useEffect(() => {
        if (isSet(props.provider_id)) {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id)).then((response) => {
                setProvider(response.data.data)
                setShowTable(true)
            })
        }
    }, [props.provider_id])

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ProviderRequestsPageName,
            data: {
                provider: {
                    id: provider.id,
                    name: provider.provider_name
                }
            }
        }
    }

    const getBaseUrl = () => {
        return getRouteItem(Routes.items, ProviderRequestsPageName).route;
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ProviderRequestsPageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                {showTable &&
                <ProviderRequestsTable provider_id={provider.id} baseUrl={getBaseUrl()}/>
                }
                </Col>
            </>
        </Admin>
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
