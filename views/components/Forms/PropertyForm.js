import React, {useEffect, useState} from "react";
import {sendData, responseHandler, fetchData} from '../../../library/api/middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {PropertyFormData} from "../../../library/forms/property-form";
const sprintf = require("sprintf-js").sprintf;

const PropertyForm = (props) => {

    const [property, setProperty] = useState({})
    const [showForm, setShowForm] = useState(false)
    const addButtonLabel = "Add Property";
    const updateButtonLabel = "Update Property";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.property, props.data.itemId)).then((response) => {
                setProperty(response.data.data);
                setShowForm(true);
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }
        responseHandler(sendData(props.data.action, "property", values), props.formResponse)
    }


    return (
        <>
            {props.data.action === "update" && showForm &&
            <DataForm
                data={
                    PropertyFormData(true, property?.property_name, property?.property_label)
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={PropertyFormData()}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}
export default PropertyForm;
