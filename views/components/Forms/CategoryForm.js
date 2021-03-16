import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {CategoryFormData} from "../../../library/forms/category-form";

const sprintf = require("sprintf-js").sprintf;

const CategoryForm = ({data, formResponse}) => {
    const [category, setCategory] = useState({})
    const [showForm, setShowForm] = useState(false)
    const addButtonLabel = "Add Category";
    const updateButtonLabel = "Update Category";

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.category,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setCategory(responseData.data);
                    setShowForm(true);
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
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            {data.action === "update" && showForm &&
                <DataForm
                    data={CategoryFormData(true, category?.category_name, category?.category_label)}
                    submitCallback={submitCallbackHandler}
                    submitButtonText={updateButtonLabel}
                />
            }
            {data.action !== "update" &&
                <DataForm
                    data={CategoryFormData()}
                    submitCallback={submitCallbackHandler}
                    submitButtonText={addButtonLabel}
                />
            }
        </>
    );
}
export default CategoryForm;
