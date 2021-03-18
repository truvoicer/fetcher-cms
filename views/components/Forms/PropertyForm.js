import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import DataForm from "./DataForm/DataForm";
import {PropertyFormData} from "../../../library/forms/property-form";

const PropertyForm = ({data, formResponse}) => {

    const [property, setProperty] = useState({})
    const addButtonLabel = "Add Property";
    const updateButtonLabel = "Update Property";

    useEffect(() => {
        if (data?.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.property,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setProperty(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.property,
            operation: (data.action === "update")? `${data.itemId}/update` : "create",
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }


    return (
        <>
            <DataForm
                formType={"single"}
                data={PropertyFormData((data.action === "update"), property)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}
export default PropertyForm;
