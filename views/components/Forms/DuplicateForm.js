import {postRequest} from "../../../library/api/fetcher-api/fetcher-middleware";
import React from "react";
import DataForm from "./DataForm/DataForm";
import {DuplicateFormData} from "../../../library/forms/duplicate-form";

const DuplicateForm = ({data, formResponse}) => {
    const buttonLabel = "Duplicate";

    const submitHandler = (values) => {
        let requestData = {...values};
        requestData.id = data.item_id;
        postRequest({
            endpoint: data.endpoint,
            operation: `duplicate`,
            requestData: requestData,
            onSuccess: (responseData) => {
                formResponse(200, responseData.message, responseData.data)
            }
        })
    }

    return (
        <DataForm
            formType={"single"}
            data={DuplicateFormData()}
            submitCallback={submitHandler}
            submitButtonText={buttonLabel}
        />
    );
}

export default DuplicateForm;