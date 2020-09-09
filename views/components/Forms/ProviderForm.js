import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {ProviderFormData} from "../../../library/forms/provider-form";

const sprintf = require("sprintf-js").sprintf;

const ProviderForm = (props) => {
    const [provider, setProvider] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectData, setSelectData] = useState({
        categories: []
    });

    const [selectOptions, setSelectOptions] = useState({
        categories: [],
    });

    const addButtonLabel = "Add Provider";
    const updateButtonLabel = "Update Provider";

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            setSelectOptions({
                categories: getCategoriesSelect(response.data.data)
            })
        })
    }, [])

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.provider, props.data.itemId)).then((response) => {
                setProvider(response.data.data);
                setSelectData({
                    categories: getCategoriesSelect(response.data.data.category)
                })
                setShowForm(true);
            })

        }
    }, [props.data.itemId, props.data.action])


    const getCategoriesSelect = (data) => {
        return data.map((item, index) => {
            return {
                value: item.id,
                label: item.category_label
            }
        })
    }

    const submitHandler = (values) => {
        if (props.data.action === "update") {
            values.id = props.data.itemId;
        }

        const categories = values.categories.map((item) => {
            console.log(item.value)
            return {
                id: item.value
            }
        })
        values.categories = categories;
        responseHandler(sendData(props.data.action, "provider", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
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
            {props.data.action !== "update" &&
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