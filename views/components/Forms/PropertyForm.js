import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {PropertyFormData} from "../../../library/forms/property-form";

const PropertyForm = ({data, formResponse}) => {

    const [property, setProperty] = useState({})
    const [showForm, setShowForm] = useState(false)
    const addButtonLabel = "Add Property";
    const updateButtonLabel = "Update Property";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.property,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setProperty(responseData.data);
                    setShowForm(true);
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
            {data.action === "update" && showForm &&
            <DataForm
                data={
                    PropertyFormData(true, property?.property_name, property?.property_label)
                }
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
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
