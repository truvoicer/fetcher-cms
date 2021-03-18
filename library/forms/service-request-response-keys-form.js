import {isSet} from "../utils";
import {buildResponseKeyReturnDataType} from "../api/helpers/api-helpers";
import FormList from "../../views/components/Forms/Components/FormList";
import React from "react";

export const ServiceRequestResponseKeysFormData = (
    update = false,
    requestResponseKey = null,
    serviceRequests = [],
    returnDataTypes = []
) => {
    let serviceRequestData = {};
    let returnDataTypeData = {};
    let listData = [];
    const serviceResponseKey = requestResponseKey.service_response_key;
    if (isSet(requestResponseKey?.response_key_request_item) &&
        requestResponseKey?.response_key_request_item !== null &&
        isSet(requestResponseKey?.response_key_request_item?.service_request)
    ) {
        const serviceRequest = requestResponseKey.response_key_request_item.service_request;
        serviceRequestData = {
            value: serviceRequest.id,
            label: serviceRequest.service_request_label
        }
    }
    if (isSet(requestResponseKey?.return_data_type)) {
        returnDataTypeData = buildResponseKeyReturnDataType(requestResponseKey.return_data_type);
    }
    if (isSet(requestResponseKey.array_keys)) {
        if (requestResponseKey.array_keys !== null && requestResponseKey.array_keys !== "") {
            listData = requestResponseKey.array_keys;
        }
    }
    return {
        fields: [
            {
                rowIndex: 0,
                columnIndex: 0,
                name: "key_name",
                label: "Key name",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key name",
                value: serviceResponseKey?.key_name ? serviceResponseKey.key_name : "",
            },
            {
                rowIndex: 1,
                columnIndex: 0,
                name: "response_key_value",
                label: "Key Value",
                fieldType: "text",
                type: "text",
                placeHolder: "Enter a key value",
                value: requestResponseKey?.response_key_value ? requestResponseKey.response_key_value : "",
            },
            {
                rowIndex: 2,
                columnIndex: 0,
                showLabel: false,
                label: "Prepend Extra Data?",
                name: "prepend_extra_data",
                fieldType: "checkbox",
                checkboxType: "true_false",
                value: requestResponseKey?.prepend_extra_data? requestResponseKey.prepend_extra_data : false,
                subFields: [
                    {
                        dependsOn: {
                            field: "prepend_extra_data",
                            value: true
                        },
                        name: "prepend_extra_data_value",
                        label: "Prepend Extra Data Value",
                        type: "text",
                        fieldType: "text",
                        placeHolder: "Enter extra data to prepend",
                        value: requestResponseKey?.prepend_extra_data_value? requestResponseKey.prepend_extra_data_value : ""
                    },
                ]
            },
            {
                rowIndex: 3,
                columnIndex: 0,
                showLabel: false,
                label: "Append Extra Data?",
                name: "append_extra_data",
                fieldType: "checkbox",
                value: requestResponseKey.append_extra_data? requestResponseKey.append_extra_data : false,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "append_extra_data",
                            value: true
                        },
                        name: "append_extra_data_value",
                        label: "Append Extra Data Value",
                        type: "text",
                        fieldType: "text",
                        placeHolder: "Enter extra data to append",
                        value: requestResponseKey.append_extra_data_value? requestResponseKey.append_extra_data_value : ""
                    },
                ]
            },
            {
                rowIndex: 4,
                columnIndex: 0,
                showLabel: false,
                label: "Show in response?",
                name: "show_in_response",
                fieldType: "checkbox",
                value: requestResponseKey.show_in_response? requestResponseKey.show_in_response : false,
                checkboxType: "true_false",
            },
            {
                rowIndex: 5,
                columnIndex: 0,
                showLabel: false,
                label: "List item??",
                name: "list_item",
                fieldType: "checkbox",
                value: "1",
                checked: requestResponseKey.list_item? requestResponseKey.list_item : false,
                checkboxType: "true_false",
            },
            {
                rowIndex: 6,
                columnIndex: 0,
                showLabel: false,
                label: "Has array value?",
                name: "has_array_value",
                fieldType: "checkbox",
                value: requestResponseKey.has_array_value? requestResponseKey.has_array_value : false,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "has_array_value",
                            value: true
                        },
                        rowIndex: 0,
                        columnIndex: 0,
                        name: "return_data_type",
                        label: "Return Data Type",
                        fieldType: "select",
                        multi: false,
                        options: returnDataTypes,
                        value: returnDataTypeData,
                    },
                    {
                        dependsOn: {
                            field: "has_array_value",
                            value: true
                        },
                        rowIndex: 1,
                        columnIndex: 0,
                        name: "array_keys",
                        label: "List",
                        fieldType: "form_list",
                        listItemKeyLabel: "Key",
                        listItemValueLabel: "Value",
                        addRowLabel: "Add New",
                        value: listData,
                    },
                ]
            },
            {
                rowIndex: 7,
                columnIndex: 0,
                showLabel: false,
                label: "Is a service request?",
                name: "is_service_request",
                fieldType: "checkbox",
                value: requestResponseKey.is_service_request? requestResponseKey.is_service_request : false,
                checkboxType: "true_false",
                subFields: [
                    {
                        dependsOn: {
                            field: "is_service_request",
                            value: true
                        },
                        rowIndex: 0,
                        columnIndex: 0,
                        name: "response_key_request_item",
                        label: "Service Request",
                        fieldType: "select",
                        multi: false,
                        options: serviceRequests,
                        value: serviceRequestData,
                    },
                ]
            },
        ]
    };
}