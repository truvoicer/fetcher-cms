import ApiConfig from "../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import Admin from "../../../../../views/layouts/Admin";
import ProviderPropertiesTable from "../../../../../views/components/Tables/ProviderPropertiesTable";
import Col from "react-bootstrap/Col";
import {fetchData} from "../../../../../library/api/fetcher-api/fetcher-middleware";
import {isSet} from "../../../../../library/utils";
import {error} from "next/dist/build/output/log";

const sprintf = require("sprintf-js").sprintf;

const ProviderProperties = (props) => {
    ProviderProperties.PageName = "provider_properties";
    const [provider, setProvider] = useState({});
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isSet(props.provider_id)) {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.provider_id))
            .then((response) => {
                setProvider(response.data.data)
                setShowTable(true)
            })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [props.provider_id]);

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ProviderProperties.PageName,
            data: {
                provider_properties: {
                    id: provider.id,
                    name: provider.provider_name
                }
            }
        }
    }

    return (
        <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ProviderProperties.PageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                {showTable &&
                    <ProviderPropertiesTable provider_id={provider.id}/>
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

export default ProviderProperties;