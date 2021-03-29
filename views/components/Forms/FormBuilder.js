import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import DataForm from "./DataForm/DataForm";
import {ProviderFormData} from "../../../library/forms/provider-form";
import {buildCategoriesSelectOptions} from "../../../library/api/helpers/api-helpers";

const FormBuilder = ({data, formResponse,  config}) => {
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const [provider, setProvider] = useState({});
    const [categories, setCategories] = useState([]);

    const addButtonLabel = "Add Provider";
    const updateButtonLabel = "Update Provider";

    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.category,
            operation: `list`,
            onSuccess: (responseData) => {
                setCategories(buildCategoriesSelectOptions(responseData.data))
            }
        })
    }, [])

    useEffect(() => {
        if (data?.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.provider,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setProvider(responseData.data);
                }
            })
        }
    }, [data.itemId, data.action])

    const submitHandler = (values) => {
        let requestData = {...values};
        if (data.action === "update") {
            requestData.id = data.itemId;
        }

        requestData.category = requestData.category.map((item) => {
            return {
                id: item.value
            }
        });
        postRequest({
            endpoint: ApiConfig.endpoints.provider,
            operation: (data.action === "update")? `${data.itemId}/update` : "create",
            requestData: requestData,
            onSuccess: (responseData) => {
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
                data={ProviderFormData((data.action === "update"), provider, categories)}
                submitCallback={submitHandler}
                submitButtonText={(data.action === "update")? updateButtonLabel : addButtonLabel}
            />
        </>
    );
}
export default FormBuilder;