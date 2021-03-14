import ApiConfig from "../../../../../config/api-config";
import React, {useEffect, useState} from "react";
import SidebarLayout from "../../../../../views/layouts/SidebarLayout";
import ProviderPropertiesTable from "../../../../../views/components/Tables/ProviderPropertiesTable";
import Col from "react-bootstrap/Col";
import {fetchData, fetchRequest} from "../../../../../library/api/fetcher-api/fetcher-middleware";
import {isSet} from "../../../../../library/utils";
import {
    setBreadcrumbsDataAction,
    setBreadcrumbsPageNameAction
} from "../../../../../library/redux/actions/breadcrumbs-actions";

const ProviderProperties = (props) => {
    ProviderProperties.PageName = "provider_properties";

    const [provider, setProvider] = useState({});
    const [showTable, setShowTable] = useState(false);


    useEffect(() => {
        if (isSet(props.provider_id)) {
            fetchRequest({
                endpoint: ApiConfig.endpoints.provider,
                operation: `${props.provider_id}`,
                onSuccess: (responseData) => {
                    setProvider(responseData.data)
                    setShowTable(true)
                    setBreadcrumbsPageNameAction(ProviderProperties.PageName)
                    setBreadcrumbsDataAction({
                        provider_properties: {
                            id: responseData.data.id,
                            name: responseData.data.provider_name
                        }
                    })
                }
            })
        }
    }, [props.provider_id]);

    return (
        <SidebarLayout pageName={ProviderProperties.PageName}>
            <>
                <Col sm={12} md={12} lg={12}>
                {showTable &&
                    <ProviderPropertiesTable provider_id={provider.id}/>
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

export default ProviderProperties;