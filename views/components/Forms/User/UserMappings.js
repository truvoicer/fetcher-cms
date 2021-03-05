import React, {useEffect, useState} from "react";
import {isNotEmpty} from "../../../../library/utils";
import {fetchData, fetchRequest, postRequest} from "../../../../library/api/fetcher-api/fetcher-middleware";
import ApiConfig from "../../../../config/api-config";
import DataForm from "../DataForm/DataForm";
import {MappingsFormData} from "../../../../library/forms/mappings-form";

const UserMappings = ({data, config}) => {
    const [showForm, setShowForm] = useState(false);
    const [mappings, setMappings] = useState(null);
    const [providerOptions, setProviderOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [response, setResponse] = useState({
        show: false,
        variant: "",
        message: ""
    });
    const updateButtonLabel = "Save";

    const getUserMappings = (userId) => {
        fetchRequest({
            endpoint: ApiConfig.endpoints.admin,
            operation: `user/${userId}/mappings`,
            onSuccess: (responseData) => {
                console.log(responseData)
                if (responseData.status === "success") {
                    setMappings(responseData.data)
                    setShowForm(true);
                }
            },
            onError: (error) => {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.providerList)).then((response) => {
            setProviderOptions(getProvidersSelect(response.data.data))
        })
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            setCategoryOptions(getCategoriesSelect(response.data.data))
        })
    }, [])

    useEffect(() => {
        console.log(data)
        if (isNotEmpty(data?.itemId)) {
            // getUserMappings(data.itemId)
        }
    }, [data.itemId])

    const getCategoriesSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })
    }

    const getProvidersSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.provider_label
            }
        })
    }

    const submitHandler = (values) => {
        postRequest({
            endpoint: ApiConfig.endpoints.admin,
            operation: `user/${data.itemId}/mappings/save`,
            requestData: {
                providers: values.providers.map(provider => provider.value),
                categories: values.categories.map(category => category.value),
            },
            onSuccess: (responseData) => {
                setMappings(responseData.data)
                setResponse({
                    show: true,
                    variant: "success",
                    message: responseData.message
                })
            },
            onError: (error) => {
                setResponse({
                    show: true,
                    variant: "success",
                    message: "Error"
                })
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
                data={MappingsFormData({
                    mappings: mappings,
                    categoryOptions: categoryOptions,
                    providerOptions: providerOptions
                })}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
        </>
    );
}
export default UserMappings;