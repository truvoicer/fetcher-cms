import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import DataForm from "./DataForm/DataForm";
import {CategoryFormData} from "../../../library/forms/category-form";

const CategoryForm = ({data, formResponse}) => {
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const [category, setCategory] = useState({})
    const addButtonLabel = "Add Category";
    const updateButtonLabel = "Update Category";

    useEffect(() => {
        if (data?.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.category,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setCategory(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitCallbackHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }
        postRequest({
            endpoint: ApiConfig.endpoints.category,
            operation: (data.action === "update")? `${data.itemId}/update` : "create",
            requestData: requestData,
            onSuccess: (responseData) => {
                setCategory(responseData.data)
                setResponse({
                    show: true,
                    variant: "success",
                    message: responseData.message
                })
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            {response.show &&
            <div className={`alert alert-${response.variant}`} role="alert">
                {response.message}
            </div>
            }
            <DataForm
                formType={"single"}
                data={CategoryFormData((data.action === "update"), category)}
                submitCallback={submitCallbackHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}
export default CategoryForm;
