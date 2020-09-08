import React, {useEffect, useState} from "react";
import {sendData, fetchData, responseHandler} from '../../../library/api/middleware'
import ApiConfig from "../../../config/api-config";
import {isSet} from "../../../library/utils";
import DataForm from "./DataForm";
import {CategoryFormData} from "../../../library/forms/category-form";

const sprintf = require("sprintf-js").sprintf;

const CategoryForm = (props) => {
    const [category, setCategory] = useState({})
    const [showForm, setShowForm] = useState(false)
    const addCategoryButtonLabel = "Add Category";
    const updateCategoryButtonLabel = "Update Category";

    useEffect(() => {
        if (isSet(props.data.action) && props.data.action === "update") {
            fetchData(sprintf(ApiConfig.endpoints.category, props.data.itemId)).then((response) => {
                setCategory(response.data.data);
                setShowForm(true);
            })
        }
    }, [props.data.itemId, props.data.action])

    const submitCallbackHandler = (values) => {
        values.id = props.data.itemId;
        responseHandler(sendData(props.data.action, "category", values), props.formResponse);
    }

    return (
        <>
            {props.data.action === "update" && showForm &&
                <DataForm
                    data={CategoryFormData(true, category?.category_name, category?.category_label)}
                    submitCallback={submitCallbackHandler}
                    submitButtonText={updateCategoryButtonLabel}
                />
            }
            {props.data.action !== "update" &&
                <DataForm
                    data={CategoryFormData()}
                    submitCallback={submitCallbackHandler}
                    submitButtonText={addCategoryButtonLabel}
                />
            }
        </>
    );
}
export default CategoryForm;
