import React, {useEffect, useState} from "react";
import {fetchRequest, postRequest} from '../../../library/api/fetcher-api/fetcher-middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ProviderFormData} from "../../../library/forms/provider-form";

const sprintf = require("sprintf-js").sprintf;

const ProviderForm = ({data, formResponse}) => {
    const [provider, setProvider] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectData, setSelectData] = useState({
        category: []
    });

    const [selectOptions, setSelectOptions] = useState({
        category: [],
    });

    const addButtonLabel = "Add Provider";
    const updateButtonLabel = "Update Provider";

    useEffect(() => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.category,
            operation: `list`,
            onSuccess: (responseData) => {
                setSelectOptions({
                    category: getCategoriesSelect(responseData.data)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (isSet(data.action) && data.action === "update") {
            fetchRequest({
                endpoint: ApiConfig.endpoints.provider,
                operation: `${data.itemId}`,
                onSuccess: (responseData) => {
                    setProvider(responseData.data);
                    setSelectData({
                        category: getCategoriesSelect(responseData.data.category)
                    })
                    setShowForm(true);
                }
            })
        }
    }, [data.itemId, data.action])


    const getCategoriesSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })
    }

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
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <>
            {data.action === "update" && showForm &&
            <DataForm
                data={
                    ProviderFormData(
                        true,
                        provider.provider_label,
                        provider.provider_name,
                        provider.provider_user_id,
                        provider.provider_api_base_url,
                        provider.provider_access_key,
                        provider.provider_secret_key,
                    )
                }
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {data.action !== "update" &&
            <DataForm
                data={ProviderFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}
export default ProviderForm;