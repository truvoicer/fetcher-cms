import {responseHandler, sendData} from "../../../library/api/middleware";
import React from "react";
import DataForm from "./DataForm";
import {DuplicateFormData} from "../../../library/forms/duplicate-form";

const DuplicateForm = (props) => {
    const buttonLabel = "Duplicate";
    const submitHandler = (values) => {
        values.id = props.data.item_id;
        responseHandler(sendData("duplicate", props.data.endpoint, values), props.formResponse);
    }

    return (
        <DataForm
            data={DuplicateFormData()}
            submitCallback={submitHandler}
            submitButtonText={buttonLabel}
        />
    );
}

export default DuplicateForm;