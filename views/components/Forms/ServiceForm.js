import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ServiceFormData} from "../../../library/forms/service-form";

const sprintf = require("sprintf-js").sprintf;

const ServiceForm = (props) => {
    const [service, setService] = useState({});
    const [showForm, setShowForm] = useState(false);

    const addButtonLabel = "Add Service";
    const updateButtonLabel = "Update Service";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.service, props.data.itemId)).then((response) => {
                setService(response.data.data);
                setShowForm(true);
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        responseHandler(sendData(props.data.action, "service", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    ServiceFormData(
                        true,
                        service.service_label,
                        service.service_name,
                    )
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceFormData()}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}
export default ServiceForm;
