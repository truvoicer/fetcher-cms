import ApiConfig from '../../../config/api-config'
import {fetchData, responseHandler, sendData} from "../../../library/api/middleware";
import React, {useEffect, useState} from "react";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceRequestParameterFormData} from "../../../library/forms/service-request-parameter-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceParametersForm = (props) => {

    const addButtonLabel = "Add Request Parameter";
    const updateButtonLabel = "Update Request Parameter";

    const [serviceRequestParameter, setServiceRequestParameter] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectData, setSelectData] = useState({
        value_types: {
            label: "Text",
            value: "text"
        }
    });

    const [selectOptions, setSelectOptions] = useState({
        value_types: [
            {
                label: "Text",
                value: "text"
            },
            {
                label: "Textarea",
                value: "textarea"
            }
        ],
    });
    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.serviceRequestParameter, props.data.itemId)).then((response) => {
                setServiceRequestParameter(response.data.data);
                setShowForm(true);
            })

        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        values.service_request_id = props.config.service_request_id;
        responseHandler(sendData(props.data.action, "service/request/parameter", values),  props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceRequestParameterFormData(
                        true,
                        serviceRequestParameter.parameter_name,
                        serviceRequestParameter.parameter_value,
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
                data={ServiceRequestParameterFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}

export default ServiceParametersForm;