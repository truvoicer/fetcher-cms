import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestFormData} from "../../../library/forms/service-request-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceRequestForm = (props) => {
    const [serviceRequest, setServiceRequest] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectData, setSelectData] = useState({
        services: {}
    });

    const [selectOptions, setSelectOptions] = useState({
        services: [],
    });

    const addButtonLabel = "Add Service Request";
    const updateButtonLabel = "Update Service Request";

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.serviceList)).then((response) => {
            setSelectOptions({
                services: getServicesSelect(response.data.data)
            })
        })
    }, [])

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceRequest, props.data.itemId)).then((response) => {
                setServiceRequest(response.data.data);
                setSelectData({
                    services: {
                        value: response.data.data.service.id,
                        label: response.data.data.service.service_label
                    }
                })
                setShowForm(true);
            })

        }
    }, [props.data.itemId, props.data.action])

    const getServicesSelect = (requests) => {
        return requests.map((item, index) => {
            return {
                value: item.id,
                label: item.service_label
            }
        })
    }

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.provider_id = props.config.provider_id;
        values.services.id = values.services.value;
        responseHandler(sendData(props.data.action, "service/request", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestFormData(
                        true,
                        serviceRequest.service_request_name,
                        serviceRequest.service_request_label,
                    )
                }
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceRequestFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default ServiceRequestForm;