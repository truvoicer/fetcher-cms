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
    const [selectData, setSelectData] = useState({
        category: {}
    });

    const [selectOptions, setSelectOptions] = useState({
        category: [],
    });

    const addButtonLabel = "Add Service";
    const updateButtonLabel = "Update Service";

    useEffect(() => {
        fetchData(sprintf(ApiConfig.endpoints.categoryList)).then((response) => {
            setSelectOptions({
                category: getCategoriesSelect(response.data.data)
            })
        })
    }, [])

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.service, props.data.itemId)).then((response) => {
                setService(response.data.data);
                setSelectData({
                    category: {
                        value: response.data.data.category.id,
                        label: response.data.data.category.category_label
                    }
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
        values.category.id = values.category.value;
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
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={updateButtonLabel}
            />
            }
            {props.data.action !== "update" &&
            <DataForm
                data={ServiceFormData()}
                selectData={selectData}
                selectOptions={selectOptions}
                submitCallback={submitHandler}
                submitButtonText={addButtonLabel}
            />
            }
        </>
    );
}
export default ServiceForm;
