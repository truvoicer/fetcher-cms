import React, {useEffect, useState} from "react";
import Admin from "../../../views/layouts/Admin";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const sprintf = require("sprintf-js").sprintf

export const ImporterPageName = "importer";

const ImporterPage = (props) => {

    useEffect(() => {

    }, []);

    const getBreadcrumbsConfig = () => {
        return {
            pageName: ImporterPageName,
        }
    }

    const selectChangeHandler = (e) => {
        // setRequestType({
        //     value: e.value,
        //     label: e.label
        // })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // let queryData = {
        //     request_type: requestType.value,
        //     provider: provider.data.provider_name,
        // }
        // queryParameterData.map((item) => {
        //     queryData[item.name] = item.value
        // })
        // responseHandler(fetchData(ApiConfig.endpoints.serviceApiRequest, queryData),
        //     getRequestCallback);
    }

    const getRequestCallback = (status, message, data = null) => {
        // let result;
        // console.log(data)
        // if (status === 200) {
        //     if (data.content_type === "json") {
        //         result = JSON.stringify(data.request_data, undefined, 4)
        //     } else if (data.content_type === "xml") {
        //         result = data.request_data
        //     }
        //
        // } else {
        //     result = "Error: " + message
        // }
        // setRequest({
        //     show: true,
        //     resultString: result
        // })
    }


    return (
        <>
            <Admin breadcrumbsConfig={getBreadcrumbsConfig()} pageName={ImporterPageName}>
                <>
                    <Col sm={12} md={12} lg={12}>
                        <Card>
                            <Card.Header>Importer</Card.Header>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <Row>
                                        <Col sm={12} md={3} lg={3}>

                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </>
            </Admin>
        </>
    )
}

export default ImporterPage;